const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const workShopSchema = new mongoose.Schema({
    workShopTitle:{
        type:String,
        required:[true,"Please enter the Title...!"],
        trim: true
    },
    workShopName:{
        type:String,
        required:[true,"Please enter the Name of owner...!"],
        trim: true
    },
    workShopEmail:{
        type:String,
        required:[true,"Please enter the Email of owner...!"],
        unique:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Invalid email.Please provide a valid email",
        ]
    },
    workShopPhone:{
        type:String,
        required:[true,"Please enter the Contact Number...!"],
        trim: true,
    },
    workShopDescription:{
        type:String,
        required:[true,"Please enter the Description...!"]
    },
    workShopPassword:{
        type:String,
        required:[true,"Please enter the Passowrd...!"],
        minlength: 8,
        select:false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
       
});


workShopSchema.pre("save", async function(next){
    if(!this.isModified("workShopPassword")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.workShopPassword = await bcrypt.hash(this.workShopPassword, salt);
    next();

});

workShopSchema.methods.matchPasswords = async function(workShopPassword){
    return await bcrypt.compare(workShopPassword, this.workShopPassword);  
}

workShopSchema.methods.getSignedToken = function(){
    return jwt.sign(
        {id: this._id},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE, }
        );
};

workShopSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

    return resetToken;
}

const WorkShop = mongoose.model("WorkShopPresenter",workShopSchema);

module.exports = WorkShop;
