/**Importing the express into this file */
const express = require('express');
/**Accessing the Router() method from the express into this file */
const router = express.Router();
/**Importing the conferenceAttendeeController.js to route */
const controller = require('../controllers/researcherController');

/**Exporting the routes to map the routes*/ 
module.exports = function() {
    router.post('/create',controller.createResearcher);
    router.get('/get/:name',controller.getOneResearcher);
    return router;
}