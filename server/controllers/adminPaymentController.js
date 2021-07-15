/**Accessing the AdminPay from AdminPayment.js */
const AdminPay = require('../models/AdminPaymentModel');

/**Creating the insert route for adminpaymentassign */
const createAdminPaymentAssign = async(req,res) => {
    const researchPaperAmount = req.body.researchPaperAmount;
    const type = "researchPaper";

    /**Declaring an object AdminPay using AdminPaymentModel class*/
    const newEntry = new AdminPay({
        researchPaperAmount,
        type
        

    });

    /**Sending the newEntry object to the database*/
    newEntry.save().then(() => {
        res.json("AdminPayment Added")
    }).catch((err) => {
        console.log(err);
    });
}

/**Creating the route for getting all the admin payement assigned values*/
const getAdminPayment = async(req,res) => {
    await AdminPay.find().then((adminpay) => {
        res.json(adminpay)
    }).catch((err) => {
        console.log(err);
    })
}
/**Creating the route for getting one value admin payement assigned value*/
const getOneAdminPayment = async(req,res) => {
    let adminPayID1 = req.params.id;

    await AdminPay.findById(adminPayID1)
    .then((getOneRecord) => {
        res.json(getOneRecord)
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with getting the record!", error: err.message});
    })
}

/**Creating the route for updating a admin assigned value*/
const updateAdminPayment = async(req,res) => {
     /**For fetching the adminPayID */
     let adminPayID = req.params.id;

     const{researchPaperAmount} = req.body;
 
     const updateAdminPay = {
         researchPaperAmount
        
     }
 
     const update = await AdminPay.findByIdAndUpdate(adminPayID, updateAdminPay)
     .then(() => {
         res.status(200).send({status: "AdminPay Updated"})
     }).catch((err) => {
         console.log(err);
         res.status(500).send({status: "Error with updating data!"});
     })
}

/**Creating the route for deleting a admin assigned value*/
const deleteAdminPayment = async(req,res) =>{
    let adminPayID = req.params.id;

    await AdminPay.findByIdAndDelete(adminPayID)
    .then(() => {
        res.status(200).send({status: "AdminPay Record Deleted"})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting the record!", error: err.message});
    })
}

/**Exporting all the methods which were declared above */
module.exports = {
    createAdminPaymentAssign,
    getAdminPayment,
    getOneAdminPayment,
    updateAdminPayment,
    deleteAdminPayment
};