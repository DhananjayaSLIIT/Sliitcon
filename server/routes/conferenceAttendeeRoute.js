/**Importing the express into this file */
const express = require('express');
/**Accessing the Router() method from the express into this file */
const router = express.Router();
/**Importing the conferenceAttendeeController.js to route */
const controller = require('../controllers/conferenceAttendeeController');

/**Exporting the routes to map the routes*/ 
module.exports = function() {
    router.post('/create',controller.createConferenceAttendee);
    router.get('/',controller.getAllAttendeePayment);
    router.get('/get/:contactNumber',controller.getOneAttendeePayment);
    router.delete('/delete/:contactNumber',controller.deleteAttendeePayment);
    return router;
}