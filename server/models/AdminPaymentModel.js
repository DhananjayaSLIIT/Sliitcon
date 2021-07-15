/*Importing mongoose*/
const mongoose = require('mongoose');

/*Importing schema package in mongoose*/
const Schema = mongoose.Schema;

/**Creating a adminPay class with attributes*/
const adminPaySchema = new Schema ({
    researchPaperAmount : {
        type: String,
        required : true,
    },
    type:{
        type:String,
        required: true,
    }
})

/**Creating a table in the database(model('databasename', adminPaySchema which was initialized above))*/
const AdminPay = mongoose.model("AdminPay", adminPaySchema);

/**Exporting the AdminPay table */
module.exports = AdminPay;