const multer = require('multer');
const fs = require('fs');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'researchPapers');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g,'-')+file.originalname);
    }
})

function fileFilter (req, file, cb) {
    if(file.mimetype === "application/pdf"){
        cb(null,true);
    }else {
        // To accept the file pass `true`, like so:
        cb(new Error("only allow pdf uploads"));
    }
}

const upload = multer({storage: storage,fileFilter:fileFilter});

module.exports = {upload};