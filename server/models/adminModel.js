const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const adminSchema = new mongoose.Schema({
    adminName:{
        type:String,
        required:[true,"Please enter the Name...!"],
        trim: true
    },
    adminEmail:{
        type:String,
        required:[true,"Please enter the Email...!"],
        unique:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Invalid email.Please provide a valid email",
        ]
    },
    
    adminPassword:{
        type:String,
        required:[true,"Please enter the Passowrd...!"],
        minlength: 8,
        select:false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
       
});


adminSchema.pre("save", async function(next){
    if(!this.isModified("adminPassword")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.adminPassword = await bcrypt.hash(this.adminPassword, salt);
    next();

});

adminSchema.methods.matchPasswords = async function(adminPassword){
    return await bcrypt.compare(adminPassword, this.adminPassword);  
}

adminSchema.methods.getSignedToken = function(){
    return jwt.sign(
        {id: this._id},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE, }
        );
};

adminSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

    return resetToken;
}

const Admin = mongoose.model("Admin",adminSchema);

module.exports = Admin;
