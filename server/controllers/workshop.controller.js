const Workshop = require('../models/workshop.model');
const fs = require('fs')
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink)

const addWorkshop = async (req, res) => {
    if (req.body) {

        const workshopTopic = req.body.workshopTopic;
        const conference = req.body.conference;
        const email = req.body.email;
        const contactNumber = req.body.contactNumber;
        const reviewerStatus = "Pending";
        const workshopFile = req.file.originalname;
        const filePath = req.file.path;

        const newWorkshop = new Workshop({
            workshopTopic,
            conference,
            email,
            contactNumber,
            workshopFile,
            filePath,
            reviewerStatus
        })
        await newWorkshop.save()
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
}

const viewAllWorkshop = async (req, res) => {
    await Workshop.find()
    .then(data => {
        res.status(200).send({ data: data });
    })
    .catch(error => {
        res.status(500).send({ error: error.message });
    });
}

const viewWorkshop = async (req, res) => {
    if (req.params && req.params.topic) {
        await Workshop.findOne({"workshopTopic":req.params.topic})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
}

const viewConferenceWorkshop = async (req, res) => {
    if (req.params && req.params.conf) {
        await Workshop.find({"conference":req.params.conf,"reviewerStatus":"Accepted"})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
}

const viewConductorWorkshop = async (req, res) => {
    if (req.params && req.params.email) {
        await Workshop.find({"email":req.params.email})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
}

const updateWorkshop = async (req, res) => {
    if (req.body && req.params && req.params.topic) {
        const workshopTopic = req.body.workshopTopic;
        const conference = req.body.conference;
        const email = req.body.email;
        const contactNumber = req.body.contactNumber;
        const workshopFile = req.file.originalname;
        const filePath = req.file.path;
        const oldfilePath = req.body.oldPath;
        await unlinkAsync(oldfilePath);

        const updateWorkshop = {
            workshopTopic,
            conference,
            email,
            contactNumber,
            workshopFile,
            filePath
        }
        
        await Workshop.findOneAndUpdate({"workshopTopic":req.params.topic},updateWorkshop)
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
}

const updateWorkshopWithoutFile = async (req, res) => {
    if (req.body && req.params && req.params.topic) {
        const workshopTopic = req.body.workshopTopic;
        const conference = req.body.conference;
        const email = req.body.email;
        const contactNumber = req.body.contactNumber;

        const updateWorkshop = {
            workshopTopic,
            conference,
            email,
            contactNumber
        }
        
        await Workshop.findOneAndUpdate({"workshopTopic":req.params.topic},updateWorkshop)
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
}

const deleteWorkshop = async (req, res) => {
    if (req.params) {
        const path1 = req.params.path+"/"+req.params.file;
        await unlinkAsync(path1);
        await Workshop.findOneAndDelete({"workshopTopic":req.params.topic})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }

}

const downloadWorkshop = (req, res) => {
    if (req.params && req.params.path) {

        const fileName = req.params.fileName;
        const path = "C:/Users/msi gf63/Desktop/SliitCon/server/uploads/";

        res.setHeader('Content-Disposition', 'attachment: filename="'+fileName+'"');
        res.download(path+fileName);
    }

}

/**Creating the route for getting a one workshop*/
const getOneWorkshops = async(req,res) =>{
    let workshopTopic = req.params.workshopTopic;
 
    await Workshop.findOne({"workshopTopic":workshopTopic}).then((getOne)=>{
        res.json(getOne);
    }).catch((err)=>{
        console.log(err);
    })
}

/**Approving workshop */
const approveWorkshop = async (req, res) => {
    if (req.params && req.params.workshopTopic) {
        let workshopTopic = req.params.workshopTopic;
 
        await Workshop.findOneAndUpdate({"workshopTopic":workshopTopic},{"reviewerStatus":"Accepted"})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
}

/**Rejecting workshop */
const rejectWorkshop = async (req, res) => {
    if (req.params && req.params.workshopTopic) {
        let workshopTopic = req.params.workshopTopic;
 
        await Workshop.findOneAndUpdate({"workshopTopic":workshopTopic},{"reviewerStatus":"Rejected"})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
}

const deletedWorkshop = async(req,res) => {
    let workshopTopic = req.params.workshopTopic;
 
    await Workshop.findOneAndDelete({"workshopTopic":workshopTopic}).then(()=>{
        res.json("Work Shop Deleted");
    }).catch((err)=>{
        console.log(err);
    });
}

module.exports = {
    addWorkshop,
    updateWorkshop,
    updateWorkshopWithoutFile,
    viewAllWorkshop,
    viewWorkshop,
    viewConductorWorkshop,
    viewConferenceWorkshop,
    deleteWorkshop,
    downloadWorkshop,
    getOneWorkshops,
    approveWorkshop,
    rejectWorkshop,
    deletedWorkshop


};