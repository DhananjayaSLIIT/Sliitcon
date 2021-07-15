const express = require('express');
const crypto =require('crypto');
const router = express.Router();
const reviewerModel = require('../models/reviewerModel');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const { getPrivateData } = require('../middleware/Private');
const { protect } =  require('../middleware/reviewerProtect');

//Protecion
router.get('/reviewer', protect, getPrivateData);

//Register
router.post('/reviewer/reviewerregister', async (req, res , next) => {
    const {reviewerName,reviewerEmail,reviewerPassword} = req.body;

    try {
        const reviewer = await reviewerModel.create({
            
            reviewerName,
            reviewerEmail,
            reviewerPassword,
        });

        sendToken(reviewer, 201, res);

        const URL = `http://localhost:3000/reviewerlogin/`;
        const message = `
            <h1>You have been selected to our Reviewers Panel.</h1>
            <p>Please go to the below link to login.</p>
            <p>Make sure to use this email address and use forgot password method to create a new password.</p>
            <a href=${URL} clicktracking=off>${URL}</a>
        `

        await sendEmail({
            to: reviewer.reviewerEmail,
            subject:"Welcome to SliitCon Reviewers Pannel",
            text: message
        });


    } catch (error) {
        next(error);
    }
});

//Login
router.post('/reviewer/reviewerlogin',async (req,res,next) =>{
    
    const {reviewerEmail, reviewerPassword} = req.body;

    if(!reviewerEmail || !reviewerPassword){
        return next(new ErrorResponse("Please provide an Email and Password...!",400));
    }

    try {
        const reviewer = await reviewerModel.findOne({reviewerEmail}).select("+reviewerPassword");

        if(!reviewer){
            return next(new ErrorResponse("Invalid credentials...!",401));
        }

        const isMatch = await reviewer.matchPasswords(reviewerPassword);

        if(!isMatch){
            return next(new ErrorResponse("Invalid Password...!",401));
        }

        sendToken(reviewer, 200, res);

    } catch (error) {
        next(error);       
    }

});

//Forgot Password
router.post('/reviewer/reviewerforgotpassword', async (req,res,next) =>{
    const {reviewerEmail} = req.body;
    
    try {
        const reviewer = await reviewerModel.findOne({reviewerEmail});

        if(!reviewer){
            return next(new ErrorResponse("Email could not be sent to this email.",404));
        }
        const resetToken = reviewer.getResetPasswordToken();

        await reviewer.save();

        const resetURL = `http://localhost:3000/reviewerresetpassword/${resetToken}`;

        const message = `
            <h1>You have requested to reset your password.</h1>
            <p>Please go to the below link to reset your password.</p>
            <a href=${resetURL} clicktracking=off>${resetURL}</a>
        `

        try {
            await sendEmail({
                to: reviewer.reviewerEmail,
                subject:"Reset password request",
                text: message
            });

            res.status(200).json({
                success:true,
                data: "Email sent"
            });

        } catch (error) {
            reviewer.resetPasswordToken = undefined;
            reviewer.resetPasswordExpire = undefined;

            await reviewer.save();

            return next(new ErrorResponse("Email could not be send.!",500));
        }

    } catch (error) {
        next(error);
    }
});

//Reset Password
router.put('/reviewer/reviewerresetpassword/:resetToken', async (req,res,next) =>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const reviewer = await reviewerModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now()}
        })

        if(!reviewer){
            return next(new ErrorResponse("Invalid reset token",400));
        }

        reviewer.reviewerPassword = req.body.reviewerPassword;

        reviewer.resetPasswordToken = undefined;
        reviewer.resetPasswordExpire = undefined;

        await reviewer.save();

        res.status(201).json({
            success:true,
            data: "Password reset successfully"
        });

    } catch (error) {
        next(error);
    }

})

//Get 
router.get('/reviewer/reviewers',(req,res) => {
    reviewerModel.find().exec((err, reviewers) => {
        if(err){
            return next(new ErrorResponse("Can not find reviewers...!",400));
        }
        return res.status(200).json({
            success: true,
            existingreviewers: reviewers,
        });
    });
});

//update
router.put('/reviewer/updatereviewer/:id',(req,res) => {
    reviewerModel.findByIdAndUpdate(
        req.params.id,{
            $set:req.body
        },
        (err, reviewer) => {
            if(err){
                return next(new ErrorResponse("Can not update reviewers...!",400));
            }
            return res.status(200).json({
                success:"Successfuly updated.!"
            });
        });
});

//Get specific data
router.get('/reviewer/reviewerdata/:id',(req,res) =>{
    const reviewerid = req.params.id;
    reviewerModel.findById(reviewerid,(err, reviewer) => {
        if(err){
            return next(new ErrorResponse("Can not find a reviewer with this id...!",400));
        }
        return res.status(200).json({
            success:true,
            reviewer
        });
    })
})

//Delete
router.delete('/reviewer/deletereviewer/:id',(req,res) =>{
    reviewerModel.findByIdAndRemove(req.params.id).exec((err,deletedreviewer)=>{
        if(err){
            return next(new ErrorResponse("Can not delete reviewer...!",400));
        }
        return res.status(200).json({
            message:"Deleted Successfuly",
            deletedreviewer
        });
    });
});

const sendToken  = (reviewer, statusCode, res) =>{
    const token = reviewer.getSignedToken();
    res.status(statusCode).json({
        success:true,
        token
    })
}

module.exports = router;