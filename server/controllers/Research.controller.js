const Research  = require('../models/Research.model');
const Conference = require('../models/conference.model');
const Payment = require('../models/AdminPaymentModel');

//Retrieve conferences from conference table
exports.getConferences = async (req, res) =>{
    try{
        await Conference.find({})
        .then(data =>{
            res.status(200).send({data:data});
        })
    }catch (err) {
        res.status(500).send({
            success:false,
            error:err.message
        })
    }
}

exports.addResearch = async (req, res) =>{
    console.log(req.file.currentID);
    const research = {
        researchTitle:req.body.researchTitle,
        conference:req.body.conference,
        researchEmail:req.body.researchEmail,
        researchPhone:req.body.researchPhone,
        reviewerStatus:req.body.reviewerStatus,
        filename:req.file.filename,
        path:req.file.path,
        userID:req.body.currentID,
        researchPayment:''
    }

    console.log(research);
    const newResearch = new Research(research);
    try{
        await newResearch.save()
        .then(data =>{
            res.status(200).send({data:data});
        });
    }catch (err) {
        res.status(500).json({
            success:false,
            error:err.message
        })
    }
}

exports.getResearchPapersByUserId = async (req, res) =>{
    console.log(req.params.id);
    try{
        const research = await Research.find({userID:req.params.id,reviewerStatus:"Pending"})
        .then(data =>{
            res.status(200).send({data:data});
        })
    }catch (err){
        res.status(500).send({
            success:false,
            error:err.message
        })
    }
}

// Retrieve payments from payment table
exports.getPayment = async (req,res) =>{
    try{
        const pay = await Payment.findOne({type:"researchPaper"})
            .then(data =>{
            res.status(200).send({data:data.researchPaperAmount});
        })
    }catch (err){
        res.status(500).send({
            success:false,
            error:err.message
        })
    }
}


exports.getAllApprovedResearch = async (req, res) =>{
    try{
        await Research.find({researchEmail:req.params.id,reviewerStatus:"Accepted"}).then (data =>{
            res.status(201).send({data:data});
        });
    }catch (err){
        res.status(500).send({
            success:false,
            error:err.message
        })
    }
}

exports.downloadResearch = (req, res) => {

    console.log(req.params.filename);
    if (req.params &&req.params.path) {

        const fileName=req.params.filename;
        const path="C:/Users/msi gf63/Desktop/SliitCon/server/researchPapers/";

        res.setHeader('Content-Disposition', 'attachment: filename="'+fileName+'"');
        res.download(path+fileName);
    }
}
exports.makePayment = async (req, res) =>{
    console.log("req ID "+req.params.id);
    console.log("req payment "+req.params.payment);
    if(req.params && req.params.id){
        try{
            await Research.findOneAndUpdate({_id:req.params.id},{researchPayment:req.params.payment})
                .then(data =>{
                    res.status(201).send({data:data})
                })
                .catch(err =>{
                    res.status(500).send({
                        success:false,
                        error:err.message
                    })
                });
        }catch (err) {
        }
    }
}

exports.updateResearchPaper = async (req, res) =>{
    const research = {
        researchTitle:req.body.researchTitle,
        conference:req.body.conference,
        researchEmail:req.body.researchEmail,
        researchPhone:req.body.researchPhone,
        reviewerStatus:req.body.reviewerStatus,
        filename:req.file.filename,
        path:req.file.path,
        userID:req.body.currentID,
        researchPayment:''
    }
    try{
        let id = req.params.id;
        console.log("back-end: "+id);
        await Research.findByIdAndUpdate(id,{$set:research}).then(data =>{
            res.status(200).send({data:data});
        });
    }catch (err) {
        res.status(500).send({
            success:false,
            error:err.message
        })
    }
}

exports.getAllPayed = async (req, res) => {
    try{
        await Research.find({researchPayment:{ $exists: true, $ne: null }})
        .then(data =>{
            res.status(200).send({
                data:data
            });
        });
    }catch (err) {
        res.status(500).send({
            success:false,
            error:err.message
        });
    }
}
exports.getResearchById = async (req, res) =>{
    try{
        await Research.findById(req.params.id)
        .then(data =>{
            res.status(200).send({
                data:data
            });
        });
    }catch (err) {
        res.status(500).send({
            success:false,
            error:err.message
        });
    }
}


// Add payments to payment table
exports.addPay = async (req, res) =>{
    const x = {
        researchPay:"5000",
        type:"researchPaper"
    }
    try{
        const payment = new Payment(x);
        await payment.save();
            res.status(200).send({data:payment});

    }catch (e) {
        res.status(500).send({
            success:false,
            error:err.message
        })
    }
}

exports.viewAllResearch = async (req, res) => {
    await Research.find()
    .then(data => {
        res.status(200).send({ data: data });
    })
    .catch(error => {
        res.status(500).send({ error: error.message });
    });
}

/**Creating the route for getting a one research paper*/
 exports.getOneResearchPapers = async(req,res) =>{
    let researchTitle = req.params.researchTitle;
 
    await Research.findOne({"researchTitle":researchTitle}).then((getOne)=>{
        res.json(getOne);
    }).catch((err)=>{
        console.log(err);
    })
}
/**Routes for approving the research paper  */
exports.approveResearchPaper = async (req, res) => {
    if (req.params && req.params.researchTitle) {
        let researchTitle = req.params.researchTitle;
 
        await Research.findOneAndUpdate({"researchTitle":researchTitle},{"reviewerStatus":"Accepted"})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
}
/**Routes for rejecting the research paper  */
exports.rejectResearchPaper = async (req, res) => {
    if (req.params && req.params.researchTitle) {
        let researchTitle = req.params.researchTitle;
 
        await Research.findOneAndUpdate({"researchTitle":researchTitle},{"reviewerStatus":"Rejected"})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
}
/**Routes for deleting the research paper  */
exports.deleteResearchPaper = async(req,res) => {
    let researchTitle = req.params.researchTitle;
 
    await Research.findOneAndDelete({"researchTitle":researchTitle}).then(()=>{
        res.json("Research Paper Deleted");
    }).catch((err)=>{
        console.log(err);
    });
}


//Get all research papers belong to a conference
exports.getConferencesResearch = async (req, res) =>{
    try{
        await Research.find({conference:req.params.name,reviewerStatus:"Pending"})
            .then(data =>{
                res.status(200).send({data:data});
            })
    }catch (err) {
        res.status(500).send({
            success:false,
            error:err.message
        });
    }
}