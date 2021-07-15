const mongoose = require('mongoose');
const schema = mongoose.Schema;

const conferenceDetailSchema = new schema({
    
    conferenceName:{
        type: String,
        required: true,
        unique:true
    },
    venu:{
        type: String,
        required: true
    },
    conferenceDate:{
        type: String,
        required: true
    },
    registerFee:{
        type: Number,
        required: true
    },
    adminStatus:{
        type: String
    },
    workshops: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        required: false, 
        ref: 'workshops' 
    }]

})

const Conference = mongoose.model("conferences",conferenceDetailSchema);

module.exports = Conference;