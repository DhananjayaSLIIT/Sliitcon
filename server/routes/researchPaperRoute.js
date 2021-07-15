/**Importing the express into this file */
const express = require('express');
/**Accessing the Router() method from the express into this file */
const router = express.Router();
/**Importing the conferenceAttendeeController.js to route */
const controller = require('../controllers/researchPaperController');

/**Exporting the routes to map the routes*/ 
module.exports = function() {
    router.post('/create',controller.createResearchPaper);
    router.get('/',controller.getAllResearchPapers);
    router.get('/get-OneResearchPaper/:researchTitle',controller.getOneResearchPapers);
    router.put('/update/approve/:researchTitle',controller.approveResearchPaper);
    router.put('/update/reject/:researchTitle',controller.rejectResearchPaper);
    router.delete('/delete/:researchTitle',controller.deleteResearchPaper);
    return router;
}