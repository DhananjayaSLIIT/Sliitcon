const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const researcherSchema = new mongoose.Schema({
    researcherName:{
        type:String,
        required:[true,"Please enter the Name...!"],
        trim: true
    },
    researcherTopic:{
        type:String,
        required:[true,"Please enter the Topic...!"],
        trim: true
    },
    researcherEmail:{
        type:String,
        required:[true,"Please enter the Email...!"],
        unique:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Invalid email.Please provide a valid email",
        ]
    },
    researcherPhone:{
        type:String,
        required:[true,"Please enter the Contact Number...!"],
        trim: true
    },
    researcherQualifications:{
        type:String,
        required:[true,"Please enter the Qualifications...!"]
    },
    researcherPassword:{
        type:String,
        required:[true,"Please enter the Passowrd...!"],
        minlength: 8,
        select:false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
       
});


researcherSchema.pre("save", async function(next){
    if(!this.isModified("researcherPassword")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.researcherPassword = await bcrypt.hash(this.researcherPassword, salt);
    next();

});

researcherSchema.methods.matchPasswords = async function(researcherPassword){
    return await bcrypt.compare(researcherPassword, this.researcherPassword);  
}

researcherSchema.methods.getSignedToken = function(){
    return jwt.sign(
        {id: this._id},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE, }
        );
};

researcherSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

    return resetToken;
}

const Researcher = mongoose.model("Researcher",researcherSchema);

module.exports = Researcher;
