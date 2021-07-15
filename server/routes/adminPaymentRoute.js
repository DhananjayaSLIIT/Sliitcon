/**Importing the express into this file */
const express = require('express');
/**Accessing the Router() method from the express into this file */
const router = express.Router();
/**Importing the adminPayemntController.js to route */
const controller = require('../controllers/adminPaymentController');

/**Exporting the routes to map the routes*/ 
module.exports = function() {
    router.post('/create',controller.createAdminPaymentAssign);
    router.get('/',controller.getAdminPayment);
    router.get('/get/:id',controller.getOneAdminPayment);
    router.put('/update/:id',controller.updateAdminPayment);
    router.delete('/delete/:id',controller.deleteAdminPayment);
    return router;
}