const express = require('express');
const crypto =require('crypto');
const router = express.Router();
const editorModel = require('../models/editorModel');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const { getPrivateData } = require('../middleware/Private');
const { protect } =  require('../middleware/editorProtect');

//Protecion
router.get('/editor', protect, getPrivateData);

//Register
router.post('/editor/editorregister', async (req, res , next) => {
    const {editorName,editorEmail,editorPassword} = req.body;

    try {
        const editor = await editorModel.create({
            
            editorName,
            editorEmail,
            editorPassword,
        });

        sendToken(editor, 201, res);

        const URL = `http://localhost:3000/editorlogin/`;
        const message = `
            <h1>You have been selected to our Editors Panel.</h1>
            <p>Please go to the below link to login.</p>
            <p>Make sure to use this email address and use forgot password method to create a new password.</p>
            <a href=${URL} clicktracking=off>${URL}</a>
        `

        await sendEmail({
            to: editor.editorEmail,
            subject:"Welcome to SliitCon Editors Pannel",
            text: message
        });

    } catch (error) {
        next(error);
    }
});

//Login
router.post('/editor/editorlogin',async (req,res,next) =>{
    
    const {editorEmail, editorPassword} = req.body;

    if(!editorEmail || !editorPassword){
        return next(new ErrorResponse("Please provide an Email and Password...!",400));
    }

    try {
        const editor = await editorModel.findOne({editorEmail}).select("+editorPassword");

        if(!editor){
            return next(new ErrorResponse("Invalid credentials...!",401));
        }

        const isMatch = await editor.matchPasswords(editorPassword);

        if(!isMatch){
            return next(new ErrorResponse("Invalid Password...!",401));
        }

        sendToken(editor, 200, res);

    } catch (error) {
        next(error);       
    }

});

//Forgot Password
router.post('/editor/editorforgotpassword', async (req,res,next) =>{
    const {editorEmail} = req.body;
    
    try {
        const editor = await editorModel.findOne({editorEmail});

        if(!editor){
            return next(new ErrorResponse("Email could not be sent to this email.",404));
        }
        const resetToken = editor.getResetPasswordToken();

        await editor.save();

        const resetURL = `http://localhost:3000/editorresetpassword/${resetToken}`;

        const message = `
            <h1>You have requested to reset your password.</h1>
            <p>Please go to the below link to reset your password.</p>
            <a href=${resetURL} clicktracking=off>${resetURL}</a>
        `

        try {
            await sendEmail({
                to: editor.editorEmail,
                subject:"Reset password request",
                text: message
            });

            res.status(200).json({
                success:true,
                data: "Email sent"
            });

        } catch (error) {
            editor.resetPasswordToken = undefined;
            editor.resetPasswordExpire = undefined;

            await editor.save();

            return next(new ErrorResponse("Email could not be send.!",500));
        }

    } catch (error) {
        next(error);
    }
});

//Reset Password
router.put('/editor/editorresetpassword/:resetToken', async (req,res,next) =>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const editor = await editorModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now()}
        })

        if(!editor){
            return next(new ErrorResponse("Invalid reset token",400));
        }

        editor.editorPassword = req.body.editorPassword;

        editor.resetPasswordToken = undefined;
        editor.resetPasswordExpire = undefined;

        await editor.save();

        res.status(201).json({
            success:true,
            data: "Password reset successfully"
        });

    } catch (error) {
        next(error);
    }

})

//Get 
router.get('/editor/editors',(req,res) => {
    editorModel.find().exec((err, editors) => {
        if(err){
            return next(new ErrorResponse("Can not find editors...!",400));
        }
        return res.status(200).json({
            success: true,
            existingeditors: editors,
        });
    });
});

//update
router.put('/editor/updateeditor/:id',(req,res) => {
    editorModel.findByIdAndUpdate(
        req.params.id,{
            $set:req.body
        },
        (err, editor) => {
            if(err){
                return next(new ErrorResponse("Can not update editors...!",400));
            }
            return res.status(200).json({
                success:"Successfuly updated.!"
            });
        });
});

//Get specific data
router.get('/editor/editordata/:id',(req,res) =>{
    const editorid = req.params.id;
    editorModel.findById(editorid,(err, editor) => {
        if(err){
            return next(new ErrorResponse("Can not find a editor with this id...!",400));
        }
        return res.status(200).json({
            success:true,
            editor
        });
    })
})

//Delete
router.delete('/editor/deleteeditor/:id',(req,res) =>{
    editorModel.findByIdAndRemove(req.params.id).exec((err,deletededitor)=>{
        if(err){
            return next(new ErrorResponse("Can not delete editor...!",400));
        }
        return res.status(200).json({
            message:"Deleted Successfuly",
            deletededitor
        });
    });
});

const sendToken  = (editor, statusCode, res) =>{
    const token = editor.getSignedToken();
    res.status(statusCode).json({
        success:true,
        token
    })
}

module.exports = router;