const express = require('express');
const crypto =require('crypto');
const router = express.Router();
const researcherModel = require('../models/researcherModel');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const { getPrivateData } = require('../middleware/Private');
const { protect } =  require('../middleware/researcherProtect');

//Protecion
router.get('/researcher', protect, getPrivateData);

//Register
router.post('/researcher/researcherregister', async (req, res , next) => {
    const {researcherTopic,researcherName,researcherEmail,researcherPhone,researcherQualifications,researcherPassword} = req.body;

    try {
        const researcher = await researcherModel.create({
            researcherTopic,
            researcherName,
            researcherEmail,
            researcherPhone,
            researcherQualifications,
            researcherPassword,
        });

        sendToken(researcher, 201, res);

    } catch (error) {
        next(error);
    }
});

//Login
router.post('/researcher/researcherlogin',async (req,res,next) =>{
    
    const {researcherEmail, researcherPassword} = req.body;

    if(!researcherEmail || !researcherPassword){
        return next(new ErrorResponse("Please provide an Email and Password...!",400));
    }

    try {
        const researcher = await researcherModel.findOne({researcherEmail}).select("+researcherPassword");

        if(!researcher){
            return next(new ErrorResponse("Invalid credentials...!",401));
        }

        const isMatch = await researcher.matchPasswords(researcherPassword);

        if(!isMatch){
            return next(new ErrorResponse("Invalid Password...!",401));
        }

        sendToken(researcher, 200, res);

    } catch (error) {
        next(error);       
    }

});

//Forgot Password
router.post('/researcher/researcherforgotpassword', async (req,res,next) =>{
    const {researcherEmail} = req.body;
    
    try {
        const researcher = await researcherModel.findOne({researcherEmail});

        if(!researcher){
            return next(new ErrorResponse("Email could not be sent to this email.",404));
        }
        const resetToken = researcher.getResetPasswordToken();

        await researcher.save();

        const resetURL = `http://localhost:3000/researcherresetpassword/${resetToken}`;

        const message = `
            <h1>You have requested to reset your password.</h1>
            <p>Please go to the below link to reset your password.</p>
            <a href=${resetURL} clicktracking=off>${resetURL}</a>
        `

        try {
            await sendEmail({
                to: researcher.researcherEmail,
                subject:"Reset password request",
                text: message
            });

            res.status(200).json({
                success:true,
                data: "Email sent"
            });

        } catch (error) {
            researcher.resetPasswordToken = undefined;
            researcher.resetPasswordExpire = undefined;

            await researcher.save();

            return next(new ErrorResponse("Email could not be send.!",500));
        }

    } catch (error) {
        next(error);
    }
});

//Reset Password
router.put('/researcher/researcherresetpassword/:resetToken', async (req,res,next) =>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const researcher = await researcherModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now()}
        })

        if(!researcher){
            return next(new ErrorResponse("Invalid reset token",400));
        }

        researcher.researcherPassword = req.body.researcherPassword;

        researcher.resetPasswordToken = undefined;
        researcher.resetPasswordExpire = undefined;

        await researcher.save();

        res.status(201).json({
            success:true,
            data: "Password reset successfully"
        });

    } catch (error) {
        next(error);
    }

})

//Get 
router.get('/researcher/researchers',(req,res) => {
    researcherModel.find().exec((err, researchers) => {
        if(err){
            return next(new ErrorResponse("Can not find researchers...!",400));
        }
        return res.status(200).json({
            success: true,
            existingresearchers: researchers,
        });
    });
});

//update
router.put('/researcher/updateresearcher/:id',(req,res) => {
    researcherModel.findByIdAndUpdate(
        req.params.id,{
            $set:req.body
        },
        (err, researcher) => {
            if(err){
                return next(new ErrorResponse("Can not update researchers...!",400));
            }
            return res.status(200).json({
                success:"Successfuly updated.!"
            });
        });
});

//Get specific data
router.get('/researcher/researcherdata/:id',(req,res) =>{
    const researcherid = req.params.id;
    researcherModel.findById(researcherid,(err, researcher) => {
        if(err){
            return next(new ErrorResponse("Can not find a researcher with this id...!",400));
        }
        return res.status(200).json({
            success:true,
            researcher
        });
    })
})

//Get specific data by email
router.get('/researcher/researcherdatas/:researcherEmail',(req,res) =>{
    
    let researcherEmail = req.params.researcherEmail;
    researcherModel.findOne({"researcherEmail":researcherEmail} ,(err, researcher ) => {
        if(err){
            return next(new ErrorResponse("Can not find a researcher with this email...!",400));
        }
        return res.status(200).json({
            success:true,
            researcher
        });
    })
})


//Delete
router.delete('/researcher/deleteresearcher/:id',(req,res) =>{
    researcherModel.findByIdAndRemove(req.params.id).exec((err,deletedresearcher)=>{
        if(err){
            return next(new ErrorResponse("Can not delete researcher...!",400));
        }
        return res.status(200).json({
            message:"Deleted Successfuly",
            deletedresearcher
        });
    });
});

const sendToken  = (researcher, statusCode, res) =>{
    const token = researcher.getSignedToken();
    res.status(statusCode).json({
        success:true,
        token
    })
}

module.exports = router;