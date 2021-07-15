const mongoose = require('mongoose');
const schema = mongoose.Schema;
const workshopDetailSchema = new schema({
    
    workshopTopic : {
        type: String,
        required: true,
        unique:true
    },
    conference:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    contactNumber:{
        type: String,
        required: true
    },
    workshopFile:{
        type: String,
        required: true
    },
    filePath:{
        type: String,
        required: true
    },
    reviewerStatus:{
        type: String,
        required: true
    }

})

const Workshop = mongoose.model("workshops",workshopDetailSchema);

module.exports = Workshop;