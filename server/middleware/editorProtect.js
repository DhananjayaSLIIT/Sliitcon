const jwt = require('jsonwebtoken');
const Editor = require('../models/editorModel');
const ErrorResponse = require('../utils/errorResponse')

exports.protect = async ( req,res,next) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }
    if(!token){
        return next(new ErrorResponse("Not authorized access to this route",401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const editor = await Editor.findById(decoded.id);

        if(!editor){
            return next(new ErrorResponse("Can not find a user with this id",404));
        }

        req.editor=editor;
        next();

    } catch (error) {
        return next(new ErrorResponse("Not authorized access to this route",401));
    }
}