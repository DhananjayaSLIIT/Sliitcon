const express = require('express');
const router = express.Router();
const controller = require('../controllers/conference.controller');

module.exports = function () {
  router.post('/add', controller.addConference);
  router.get('/view', controller.viewAllConferences);
  router.get('/viewAc', controller.viewApprovedConferences);
  router.get('/get/:confName', controller.viewConference);
  router.put('/update/:confName', controller.updateConferences);
  router.put('/updateAcStatus/:confName', controller.approveConferences);
  router.put('/updateFaStatus/:confName', controller.rejectConferences);
  router.delete('/delete/:confName', controller.deleteConferences);
  return router;
}