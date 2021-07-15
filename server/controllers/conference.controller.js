const Conference = require('../models/conference.model');

const addConference = async (req, res) => {
    if (req.body) {
        
        const conferenceName = req.body.confName;
        const venu = req.body.confVenu;
        const conferenceDate = req.body.confDate;
        const registerFee = Number(req.body.confRegfee);
        const adminStatus ="Not Awarded";

        const newConference = new Conference({
            conferenceName,
            venu,
            conferenceDate,
            registerFee,
            adminStatus
        })
        await newConference.save()
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
}

const viewAllConferences = async (req, res) => {
    await Conference.find()
    .then(data => {
        res.status(200).send({ data: data });
    })
    .catch(error => {
        res.status(500).send({ error: error.message });
    });
}

const viewApprovedConferences = async (req, res) => {
    await Conference.find({"adminStatus":"Accepted"})
    .then(data => {
        res.status(200).send({ data: data });
    })
    .catch(error => {
        res.status(500).send({ error: error.message });
    });
}

const viewConference = async (req, res) => {
    if (req.params && req.params.confName) {
        await Conference.findOne({"conferenceName":req.params.confName})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
}

const updateConferences = async (req, res) => {
    if (req.body && req.params && req.params.confName) {
        const conferenceName = req.body.conferenceName;
        const venu = req.body.venu;
        const conferenceDate = req.body.date
        const registerFee = Number(req.body.registerFee);

        const updateConference = {
            conferenceName,
            venu,
            conferenceDate,
            registerFee
        }
        
        await Conference.findOneAndUpdate({"conferenceName":req.params.confName},updateConference)
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
}

const approveConferences = async (req, res) => {
    if (req.params && req.params.confName) {
        await Conference.findOneAndUpdate({"conferenceName":req.params.confName},{"adminStatus":"Accepted"})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
}

const rejectConferences = async (req, res) => {
    if (req.params && req.params.confName) {
        await Conference.findOneAndUpdate({"conferenceName":req.params.confName},{"adminStatus":"Rejected"})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
}

const deleteConferences = async (req, res) => {
    if (req.params && req.params.confName) {
        await Conference.findOneAndDelete({"conferenceName":req.params.confName})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
}

module.exports = {
    addConference,
    viewAllConferences,
    viewApprovedConferences,
    viewConference,
    updateConferences,
    approveConferences,
    rejectConferences,
    deleteConferences
};