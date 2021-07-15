/*Importing mongoose*/
const mongoose = require('mongoose');

/*Importing schema package in mongoose*/
const Schema = mongoose.Schema;

/**Creating a conferenceAttendeeSchema class with attributes*/
const conferenceAttendeeSchema = new Schema({
    conferenceName:{
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
    cardNumber:{
        type: String,
        required: true
    },
    cvvNumber:{
        type: String,
        required: true
    },
    exDate:{
        type: String,
        required: true
    }
})

/**Creating a table in the database model('conferenceAttendee', conferenceAttendeeSchema which was initialized above)*/
const conferenceAttendeeDetails = mongoose.model("conferenceAttendee",conferenceAttendeeSchema);

/**Exporting the conferenceAttendee table */
module.exports = conferenceAttendeeDetails;
