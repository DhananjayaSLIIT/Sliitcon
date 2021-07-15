/**Importing the express into this file */
const express = require('express');
/**Accessing the Router() method from the express into this file */
const router = express.Router();
/**Importing the workshopNotificationController.js to route */
const controller = require('../controllers/workshopNotificationController');

/**Exporting the routes to map the routes*/ 
module.exports = function() {
    router.post('/createAccept',controller.createWorkShopNotificationAccept);
    router.post('/createReject',controller.createWorkShopNotificationReject);
    router.get('/get/:contactNumber',controller.getNotificationsWorkShop);
    return router;
}