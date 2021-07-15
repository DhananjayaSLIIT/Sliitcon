const jwt = require('jsonwebtoken');
const Reviewer = require('../models/reviewerModel');
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
        const reviewer = await Reviewer.findById(decoded.id);

        if(!reviewer){
            return next(new ErrorResponse("Can not find a user with this id",404));
        }

        req.reviewer=reviewer;
        next();

    } catch (error) {
        return next(new ErrorResponse("Not authorized access to this route",401));
    }
}