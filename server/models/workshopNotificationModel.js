/*Importing mongoose*/
const mongoose = require('mongoose');

/*Importing schema package in mongoose*/
const Schema = mongoose.Schema;

/**Creating a workShopNotification class with attributes*/
const workShopNotification = new Schema ({
    contactNumber : {
        type: String,
        required : true
    },
    workShopMessage:{
        type: String,
        required : true
    },
    date:{
        type: String,
        required : true
    }
})

/**Creating a table in the database(model('workShopNotification', workShopNotification which was initialized above))*/
const workshopnotification = mongoose.model("workShopNotification", workShopNotification);

/**Exporting the workShopNotification table */
module.exports = workshopnotification;
