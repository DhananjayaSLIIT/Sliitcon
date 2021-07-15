/**Accessing the AdminPay from conferenceAttendee.js */
const ConferenceAttendeeDetails = require('../models/conferenceAttendeeModel');
<<<<<<< HEAD
=======
const sendEmail = require('../utils/sendEmail');
>>>>>>> 4ce0d41... Final AF Commit

/**Creating the insert route for createConferenceAttendee */
const createConferenceAttendee = async(req,res) => {
    const conferenceName = req.body.conferenceName;
    const email = req.body.email;
    const contactNumber = req.body.contactNumber;
    const cardNumber = req.body.cardNumber;
    const cvvNumber = req.body.cvvNumber;
    const exDate = req.body.exDate;


    /**Declaring an object ConferenceAttendeeDetails using conferenceAttendeeModel class*/
    const newConferenceAttendee = new ConferenceAttendeeDetails({
        conferenceName,
        email,
        contactNumber,
        cardNumber,
        cvvNumber,
        exDate,
    })

    /**Sending the newConferenceAttendee object to the database*/
    await newConferenceAttendee.save().then(()=>{
        res.json("Conference Attendee Added");
<<<<<<< HEAD
    }).catch((err)=>{
        console.log(err);
    })
=======

    }).catch((err)=>{
        console.log(err);
    })

    const message = `
    <h1>Your registration to the ${newConferenceAttendee.conferenceName} has been successful.</h1>
    <p>You are now eligable to physically participate to the SliitCon.</p>
    <p>For security reasons please do not delete this email.</p>
    <p>Hope you will enjoy it.</p>
    <p>Thank you.</p>
`

await sendEmail({
    to: newConferenceAttendee.email,
    subject:"Registration to a Conference as an Attendee",
    text: message
});

>>>>>>> 4ce0d41... Final AF Commit
}

/**Creating the route for getting all the attendee payement details*/
const getAllAttendeePayment = async(req,res) =>{
    await ConferenceAttendeeDetails.find().then((conferenceAttendees)=>{
        res.json(conferenceAttendees);
    }).catch((err)=>{
        console.log(err);
    });
}
/**Creating the route for deleting a attendee payement detail*/
const deleteAttendeePayment = async(req,res) => {
    let contactNumber = req.params.contactNumber;

    await ConferenceAttendeeDetails.findOneAndDelete({"contactNumber":contactNumber}).then(()=>{
        res.json("Conference Attendee Deleted");
    }).catch((err)=>{
        console.log(err);
    });
}

/**Creating the route for getting a attendee payement detail*/
const getOneAttendeePayment = async(req,res) =>{
    let contactNumber = req.params.contactNumber;

    await ConferenceAttendeeDetails.findOne({"contactNumber":contactNumber}).then((conferenceAttendees)=>{
        res.json(conferenceAttendees);
    }).catch((err)=>{
        console.log(err);
    })
}

/**Exporting all the methods which were declared above */
module.exports = {
    createConferenceAttendee,
    getAllAttendeePayment,
    deleteAttendeePayment,
    getOneAttendeePayment
};