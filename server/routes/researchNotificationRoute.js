/**Importing the express into this file */
const express = require('express');
/**Accessing the Router() method from the express into this file */
const router = express.Router();
/**Importing the workshopNotificationController.js to route */
const controller = require('../controllers/researchNotificationController');

/**Exporting the routes to map the routes*/ 
module.exports = function() {
    router.post('/createAccept',controller.createResearchNotificationAccept);
    router.post('/createReject',controller.createResearchNotificationReject);
    router.get('/get/:researchPhone',controller.getNotificationsResearch);
    // router.get('/:contactNumber/:topic',controller.getOneNotificationAccept);
    router.delete('/delete/:id',controller.deleteNote);
   
    return router;
}