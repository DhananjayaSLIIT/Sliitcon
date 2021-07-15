const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    researchTitle:{
        type:String,
        required: [true, "Please provide title"]
    },
    filename:{
        type:String,
        required:[false]
    },
    path:{
        type:String,
        required:[false]
    },
    researchEmail:{
        type:String,
        required:[true, "Please provide a email"]
    },
    researchPhone:{
        type:String,
        required:[true, "Please provide a phone number"]
    },
    reviewerStatus:{
        type:String,
    },
    userID:{
        type:String,
        required:[true, "Please provide userID"]
    },
    researchPayment:{
        type:Number
    },
    conference:{
        type:String,
        required:[true, "Please provide a conference"]
    },

})

const ResearchModel = mongoose.model('ResearchPapers',UserSchema);
module.exports = ResearchModel;