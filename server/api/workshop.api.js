const express = require('express');
const router = express.Router();
const controller = require('../controllers/workshop.controller');
const helper = require('../helper/workshop.helper');

module.exports = function () {
  router.post('/add', helper.upload, controller.addWorkshop);
  router.get('/view', controller.viewAllWorkshop);
  router.get('/get/:topic', controller.viewWorkshop);
  router.get('/viewConfWS/:conf', controller.viewConferenceWorkshop);
  router.get('/viewConductWS/:email', controller.viewConductorWorkshop);
  router.put('/update/:topic', helper.upload,controller.updateWorkshop);
  router.put('/updateWF/:topic', controller.updateWorkshopWithoutFile);
  router.delete('/delete/:topic/:path/:file', controller.deleteWorkshop);
  router.get('/downloadWS/:path/:fileName', controller.downloadWorkshop);
  router.get('/get-OneWorkshop/:workshopTopic',controller.getOneWorkshops);
  router.put('/update/approve/:workshopTopic',controller.approveWorkshop);
  router.put('/update/reject/:workshopTopic',controller.rejectWorkshop);
  router.delete('/delete/:workshopTopic',controller.deletedWorkshop);
  return router;
}