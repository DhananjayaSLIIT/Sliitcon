/*Importing mongoose*/
const mongoose = require('mongoose');

/*Importing schema package in mongoose*/
const Schema = mongoose.Schema;

/**Creating a researchNotification class with attributes*/
const researchNotification = new Schema ({
    researchPhone : {
        type: String,
        required : true
    },
    researchMessage:{
        type: String,
        required : true
    },
    date:{
        type: String,
        required : true
    },
    status:{
        type: String,
        required : true
    },
    topic:{
        type: String,
        required : true
    }
})

/**Creating a table in the database(model('researchNotification', researchNotification which was initialized above))*/
const researchnotification = mongoose.model("researchNotification", researchNotification);

/**Exporting the workShopNotification table */
module.exports = researchnotification;