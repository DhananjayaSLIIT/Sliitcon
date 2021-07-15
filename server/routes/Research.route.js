const express = require('express');
const router = express.Router();
const {upload} = require('../utils/fileUploadHelper');
const {   getConferences, addResearch, getResearchPapersByUserId, getPayment, getAllApprovedResearch, downloadResearch, makePayment,getAllPayed,
            updateResearchPaper, getResearchById, addPay,viewAllResearch, getOneResearchPapers, approveResearchPaper, rejectResearchPaper, deleteResearchPaper,
            getConferencesResearch
       }= require('../controllers/Research.controller');

router.route('/get-conferences').get(getConferences);
router.route('/add-research').post(upload.single('file'),addResearch);
router.route('/get-all-researchById/:id').get(getResearchPapersByUserId);
router.route('/get-payment').get(getPayment);
router.route('/all-approved-research/:id').get(getAllApprovedResearch);
router.route('/download/:path/:filename').get(downloadResearch);
router.route('/update-payment/:id/:payment').get(makePayment);
router.route('/get-research-by-id/:id').get(getResearchById);
router.route('/update-research/:id').put(upload.single('file'),updateResearchPaper);
router.route('/get-all-payed').get(getAllPayed);
router.route('/getResearchAll').get(viewAllResearch);
router.route('/get-OneResearchPaper/:researchTitle').get(getOneResearchPapers);
router.route('/update/approve/:researchTitle').put(approveResearchPaper);
router.route('/update/reject/:researchTitle').put(rejectResearchPaper);
router.route('/delete/:researchTitle').delete(deleteResearchPaper);
router.route('/research-by-name/:name').get(getConferencesResearch);


router.route('/add-payment').post(addPay);



module.exports = router;