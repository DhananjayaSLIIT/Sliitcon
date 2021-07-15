exports.getPrivateData = (req,res,next) =>{
    res.status(200).json({
        success: true,
        data:"You have the access to the private data.!",
    });
};