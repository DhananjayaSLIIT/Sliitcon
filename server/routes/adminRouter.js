const express = require('express');
const crypto =require('crypto');
const router = express.Router();
const adminModel = require('../models/adminModel');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const  { getPrivateData }  = require('../middleware/Private');
const { protect }  =  require('../middleware/adminProtect');

//Protecion
// router.route('/private').get(getPrivateData) ;
router.get('/admin', protect,getPrivateData);
//Register
router.post('/admin/adminregister', async (req, res , next) => {
    const {adminName,adminEmail,adminPassword} = req.body;

    try {
        const admin = await adminModel.create({
            adminName,
            adminEmail,
            adminPassword,
        });

        sendToken(admin, 201, res);
        const URL = `http://localhost:3000/adminlogin/`;
        const message = `
            <h1>You have been selected to our Admin Panel.</h1>
            <p>Please go to the below link to login.</p>
            <p>Make sure to use this email address and use forgot password method to create a new password.</p>
            <a href=${URL} clicktracking=off>${URL}</a>
        `

        await sendEmail({
            to: admin.adminEmail,
            subject:"Welcome to SliitCon Admin Pannel",
            text: message
        });

    } catch (error) {
        next(error);
    }
});

//Login
router.post('/admin/adminlogin',async (req,res,next) =>{
    
    const {adminEmail, adminPassword} = req.body;

    if(!adminEmail || !adminPassword){
        return next(new ErrorResponse("Please provide an Email and Password...!",400));
    }

    try {
        const admin = await adminModel.findOne({adminEmail}).select("+adminPassword");

        if(!admin){
            return next(new ErrorResponse("Invalid credentials...!",401));
        }

        const isMatch = await admin.matchPasswords(adminPassword);

        if(!isMatch){
            return next(new ErrorResponse("Invalid Password...!",401));
        }

        sendToken(admin, 200, res);

    } catch (error) {
        next(error);       
    }

});

//Forgot Password
router.post('/admin/adminforgotpassword', async (req,res,next) =>{
    const {adminEmail} = req.body;
    
    try {
        const admin = await adminModel.findOne({adminEmail});

        if(!admin){
            return next(new ErrorResponse("Email could not be sent to this email.",404));
        }
        const resetToken = admin.getResetPasswordToken();

        await admin.save();

        const resetURL = `http://localhost:3000/adminresetpassword/${resetToken}`;

        const message = `
            <h1>You have requested to reset your password.</h1>
            <p>Please go to the below link to reset your password.</p>
            <a href=${resetURL} clicktracking=off>${resetURL}</a>
        `

        try {
            await sendEmail({
                to: admin.adminEmail,
                subject:"Reset password request",
                text: message
            });

            res.status(200).json({
                success:true,
                data: "Email sent"
            });

        } catch (error) {
            admin.resetPasswordToken = undefined;
            admin.resetPasswordExpire = undefined;

            await admin.save();

            return next(new ErrorResponse("Email could not be send.!",500));
        }

    } catch (error) {
        next(error);
    }
});

//Reset Password
router.put('/admin/adminresetpassword/:resetToken', async (req,res,next) =>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const admin = await adminModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now()}
        })

        if(!admin){
            return next(new ErrorResponse("Invalid reset token",400));
        }

        admin.adminPassword = req.body.adminPassword;

        admin.resetPasswordToken = undefined;
        admin.resetPasswordExpire = undefined;

        await admin.save();

        res.status(201).json({
            success:true,
            data: "Password reset successfully"
        });

    } catch (error) {
        next(error);
    }

})

//Get 
router.get('/admin/admins',(req,res) => {
    adminModel.find().exec((err, admins) => {
        if(err){
            return next(new ErrorResponse("Can not find admins...!",400));
        }
        return res.status(200).json({
            success: true,
            existingadmins: admins,
        });
    });
});

//update
router.put('/admin/updateadmin/:id',(req,res) => {
    adminModel.findByIdAndUpdate(
        req.params.id,{
            $set:req.body
        },
        (err, admin) => {
            if(err){
                return next(new ErrorResponse("Can not update admins...!",400));
            }
            return res.status(200).json({
                success:"Successfuly updated.!"
            });
        });
});

//Get specific data
router.get('/admin/admindata/:id',(req,res) =>{
    const adminid = req.params.id;
    adminModel.findById(adminid,(err, admin) => {
        if(err){
            return next(new ErrorResponse("Can not find a admin with this id...!",400));
        }
        return res.status(200).json({
            success:true,
            admin
        });
    })
})

//Delete
router.delete('/admin/deleteadmin/:id',(req,res) =>{
    adminModel.findByIdAndRemove(req.params.id).exec((err,deletedadmin)=>{
        if(err){
            return next(new ErrorResponse("Can not delete admin...!",400));
        }
        return res.status(200).json({
            message:"Deleted Successfuly",
            deletedadmin
        });
    });
});

const sendToken  = (admin, statusCode, res) =>{
    const token = admin.getSignedToken();
    res.status(statusCode).json({
        success:true,
        token
    })
}

module.exports = router;