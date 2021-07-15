/**Accessing the AdminPay from AdminPayment.js */
const researchNotification = require('../models/researchNotificationModel');

/**Creating the insert route for accept notification */
const createResearchNotificationAccept = async(req,res) => {
    const researchPhone = req.body.researchPhone;
    const researchMessage = req.body.researchTitle + " Research Paper Is Approved By Reviewer!!! Please Pay The Fee To Continue";
    const date = new Date();
    const status = "Approve";
    const topic = req.body.researchTitle;
    
    /**Declaring an object researcherNotification using researchNotificationModel class*/
    const researchnotification = new researchNotification({
        researchPhone,
        researchMessage,
        date,
        status,
        topic
    });

    /**Sending the researcherNotification object to the database*/
    researchnotification.save().then(() => {
        res.json("Research Notification Accepted")
    }).catch((err) => {
        console.log(err);
    });
}

/**Creating the insert route for reject notification */
const createResearchNotificationReject = async(req,res) => {
    const researchPhone = req.body.researchPhone;
    const researchMessage = req.body.researchTitle + " Research Paper Is Rejected By Reviewer!!!"
    const date = new Date();
    const status = "Reject";
    const topic = req.body.researchTitle;
    
    /**Declaring an object researcherNotification using researcherNotificationModel class*/
    const researchnotification = new researchNotification({
        researchPhone,
        researchMessage,
        date,
        status,
        topic
    });

    /**Sending the researcherNotification object to the database*/
    researchnotification.save().then(() => {
        res.json("Research Notification Rejected")
    }).catch((err) => {
        console.log(err);
    });
}

/**Getting the notifications related to one researcher */
const getNotificationsResearch = async(req,res) => {
    let researchPhone = req.params.researchPhone;
    var mysort = { date: -1 };  
   
    await researchNotification.find({"researchPhone":researchPhone}).sort(mysort).then((acceptNotificationR)=>{
        res.json(acceptNotificationR);
    }).catch((err)=>{
        console.log(err);
    })
}

// /**Creating the route for getting a attendee payement detail*/
// const getOneNotificationAccept = async(req,res) => {
//     //let acceptID = req.params.id;
//     let status = req.params.status;
//     let topic = req.params.topic;
//     let researchPhone = req.params.researchPhone;

//     await researchNotification.findOne({"researchPhone": researchPhone,"topic": topic }).then((positiveNot)=>{
//         res.json(positiveNot);
//     }).catch((err)=>{
//         console.log(err);
//     })
// }
// /**Getting the delete route for deleting the notifications */
const deleteNote = async(req,res) =>{
    let id = req.params.id;

    await researchNotification.findByIdAndDelete(id)
    .then(() => {
        res.status(200).send({status: "Notification Deleted"})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting the record!", error: err.message});
    })
}

/**Exporting all the methods which were declared above */
module.exports = {
    createResearchNotificationAccept,
    createResearchNotificationReject,
    getNotificationsResearch,
    //getOneNotificationAccept,
    deleteNote,
    
};