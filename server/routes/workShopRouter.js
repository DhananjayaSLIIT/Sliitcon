const express = require('express');
const crypto =require('crypto');
const router = express.Router();
const workShopModel = require('../models/workShopModel');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const { getPrivateData } = require('../middleware/Private');
const { protect } =  require('../middleware/workShopProtect');

//Protecion
router.get('/workshop', protect, getPrivateData);

//Register
router.post('/workshop/workshopregister', async (req, res , next) => {
    const {workShopTitle,workShopName,workShopEmail,workShopPhone,workShopDescription,workShopPassword} = req.body;

    try {
        const workShop = await workShopModel.create({
            workShopTitle,
            workShopName,
            workShopEmail,
            workShopPhone,
            workShopDescription,
            workShopPassword,
        });

        sendToken(workShop, 201, res);
        

    } catch (error) {
        next(error);
    }
});

//Login
router.post('/workshop/workshoplogin',async (req,res,next) =>{
    
    const {workShopEmail, workShopPassword} = req.body;

    if(!workShopEmail || !workShopPassword){
        return next(new ErrorResponse("Please provide an Email and Password...!",400));
    }

    try {
        const workShop = await workShopModel.findOne({workShopEmail}).select("+workShopPassword");

        if(!workShop){
            return next(new ErrorResponse("Invalid credentials...!",401));
        }

        const isMatch = await workShop.matchPasswords(workShopPassword);

        if(!isMatch){
            return next(new ErrorResponse("Invalid Password...!",401));
        }

        sendToken(workShop, 200, res);

    } catch (error) {
        next(error);       
    }

});


router.get('/' , protect , getPrivateData)

//Forgot Password
router.post('/workshop/workshopforgotpassword', async (req,res,next) =>{
    const {workShopEmail} = req.body;
    
    try {
        const workShop = await workShopModel.findOne({workShopEmail});

        if(!workShop){
            return next(new ErrorResponse("Email could not be sent to this email.",404));
        }
        const resetToken = workShop.getResetPasswordToken();

        await workShop.save();

        const resetURL = `http://localhost:3000/workshopresetpassword/${resetToken}`;

        const message = `
            <h1>You have requested to reset your password.</h1>
            <p>Please go to the below link to reset your password.</p>
            <a href=${resetURL} clicktracking=off>${resetURL}</a>
        `

        try {
            await sendEmail({
                to: workShop.workShopEmail,
                subject:"Reset password request",
                text: message
            });

            res.status(200).json({
                success:true,
                data: "Email sent"
            });

        } catch (error) {
            workShop.resetPasswordToken = undefined;
            workShop.resetPasswordExpire = undefined;

            await workShop.save();

            return next(new ErrorResponse("Email could not be send.!",500));
        }

    } catch (error) {
        next(error);
    }
});

//Reset Password
router.put('/workshop/workshopresetpassword/:resetToken', async (req,res,next) =>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const workShop = await workShopModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now()}
        })

        if(!workShop){
            return next(new ErrorResponse("Invalid reset token",400));
        }

        workShop.workShopPassword = req.body.workShopPassword;

        workShop.resetPasswordToken = undefined;
        workShop.resetPasswordExpire = undefined;

        await workShop.save();

        res.status(201).json({
            success:true,
            data: "Password reset successfully"
        });

    } catch (error) {
        next(error);
    }

})

//Get 
router.get('/workshop/workshops',(req,res) => {
    workShopModel.find().exec((err, workshops) => {
        if(err){
            return next(new ErrorResponse("Can not find Workshops...!",400));
        }
        return res.status(200).json({
            success: true,
            existingWorkshops: workshops,
        });
    });
});

//update
router.put('/workshop/updateworkshop/:id',(req,res) => {
    workShopModel.findByIdAndUpdate(
        req.params.id,{
            $set:req.body
        },
        (err, workshop) => {
            if(err){
                return next(new ErrorResponse("Can not update Workshops...!",400));
            }
            return res.status(200).json({
                success:"Successfuly updated.!"
            });
        });
});

//Get specific data
router.get('/workshop/workshopdata/:id',(req,res) =>{
    const workshopid = req.params.id;
    workShopModel.findById(workshopid,(err, workshop) => {
        if(err){
            return next(new ErrorResponse("Can not find a workshop with this id...!",400));
        }
        return res.status(200).json({
            success:true,
            workshop
        });
    })
})

//Get specific data by email
router.get('/workshop/workshopdatas/:workShopEmail',(req,res) =>{
    
    let workShopEmail = req.params.workShopEmail;
    workShopModel.findOne({"workShopEmail":workShopEmail} ,(err, workshop ) => {
        if(err){
            return next(new ErrorResponse("Can not find a workshop with this email...!",400));
        }
        return res.status(200).json({
            success:true,
            workshop
        });
    })
})

//Delete
router.delete('/workshop/deleteworkshop/:id',(req,res) =>{
    workShopModel.findByIdAndRemove(req.params.id).exec((err,deletedworkshop)=>{
        if(err){
            return next(new ErrorResponse("Can not delete Workshop...!",400));
        }
        return res.status(200).json({
            message:"Deleted Successfuly",
            deletedworkshop
        });
    });
});

const sendToken  = (workShop, statusCode, res) =>{
    const token = workShop.getSignedToken();
    res.status(statusCode).json({
        success:true,
        token
    })
}

module.exports = router;