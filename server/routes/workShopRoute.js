/**Importing the express into this file */
const express = require('express');
/**Accessing the Router() method from the express into this file */
const router = express.Router();
/**Importing the conferenceAttendeeController.js to route */
const controller = require('../controllers/workShopController');

/**Exporting the routes to map the routes*/ 
module.exports = function() {
    router.post('/create',controller.createWorkShop);
    router.get('/',controller.getAllWorkshops);
    router.get('/get-OneWorkshop/:workshopTopic',controller.getOneWorkshops);
    router.put('/update/approve/:workshopTopic',controller.approveWorkshop);
    router.put('/update/reject/:workshopTopic',controller.rejectWorkshop);
    router.delete('/delete/:workshopTopic',controller.deleteWorkshop);
    return router;
}