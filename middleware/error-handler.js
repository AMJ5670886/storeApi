const errorHandler = async(err,req,res,next)=>{
    res.status(500).json({msg:"Something went wrong"})
}

module.exports = errorHandler;
