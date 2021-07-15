/**Accessing the workshopNotification from workshopNotificationModel.js */
const workshopNotification = require('../models/workshopNotificationModel');

/**Creating the insert route for accept notification */
const createWorkShopNotificationAccept = async(req,res) => {
    const contactNumber = req.body.contactNumber;
    const workShopMessage =req.body.workshopTopic + " Workshop Is Approved By Reviewer!!!"
    const date = new Date();
    
    /**Declaring an object workshopNotification using workshopNotificationModel class*/
    const workshopnotification = new workshopNotification({
        contactNumber,
        workShopMessage,
        date
    });

    /**Sending the workshopnotification object to the database*/
    workshopnotification.save().then(() => {
        res.json("Workshop Notification Accepted")
    }).catch((err) => {
        console.log(err);
    });
}
/**Creating the insert route for reject notification */
const createWorkShopNotificationReject = async(req,res) => {
    const contactNumber = req.body.contactNumber;
    const workShopMessage =req.body.workshopTopic + " Workshop Is Rejected By Reviewer!!!"
    const date = new Date();

   /**Declaring an object workshopNotification using workshopNotificationModel class*/
    const workshopnotification = new workshopNotification({
        contactNumber,
        workShopMessage,
        date
    });

    /**Sending the workshopnotification object to the database*/
    workshopnotification.save().then(() => {
        res.json("Workshop Notification Rejected")
    }).catch((err) => {
        console.log(err);
    });
}
/**Getting all workshop notifications */
const getNotificationsWorkShop = async(req,res) => {
    let contactNumber = req.params.contactNumber;

    var mysort = { date: -1 };

    await workshopNotification.find({"contactNumber":contactNumber}).sort(mysort).then((acceptNotificationShop)=>{
        res.json(acceptNotificationShop);
    }).catch((err)=>{
        console.log(err);
    })
}
/**Exporting all the methods which were declared above */
module.exports = {
    createWorkShopNotificationAccept,
    createWorkShopNotificationReject,
    getNotificationsWorkShop 
};
