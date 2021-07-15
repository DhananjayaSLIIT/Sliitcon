const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const reviewerSchema = new mongoose.Schema({
    reviewerName:{
        type:String,
        required:[true,"Please enter the Name...!"],
        trim: true
    },
    reviewerEmail:{
        type:String,
        required:[true,"Please enter the Email...!"],
        unique:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Invalid email.Please provide a valid email",
        ]
    },
    
    reviewerPassword:{
        type:String,
        required:[true,"Please enter the Passowrd...!"],
        minlength: 8,
        select:false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
       
});


reviewerSchema.pre("save", async function(next){
    if(!this.isModified("reviewerPassword")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.reviewerPassword = await bcrypt.hash(this.reviewerPassword, salt);
    next();

});

reviewerSchema.methods.matchPasswords = async function(reviewerPassword){
    return await bcrypt.compare(reviewerPassword, this.reviewerPassword);  
}

reviewerSchema.methods.getSignedToken = function(){
    return jwt.sign(
        {id: this._id},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE, }
        );
};

reviewerSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

    return resetToken;
}

const Reviewer = mongoose.model("Reviewer",reviewerSchema);

module.exports = Reviewer;
