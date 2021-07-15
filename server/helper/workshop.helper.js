'use strict';
const multer = require('multer');
var path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        callback(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const filefilter = (req, file, callback) => {
    var ext = path.extname(file.originalname);
    if(ext !== '.pptx') {
        return callback(new Error('Only Powerpoint Files are allowed'))
    }
    else{
        callback(null, true)
    }
}

const upload = multer({storage: storage, fileFilter: filefilter}).single("file");;

module.exports = {upload};