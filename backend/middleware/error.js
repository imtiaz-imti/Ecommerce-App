const ErrorHander = require('../utils/errorHandler')
module.exports = (err,req,res,next)=>{
   err.statusCode = err.statusCode || 500
   err.message = err.message || 'Internal server error'
   if(err.name ==='CastError'){
      err = new ErrorHander('product not found',400)
   }
   if(err.code === 11000){
      err = new ErrorHander(`This email already exist`,400)
   }
   res.status(err.statusCode).json({success:false,message:err.message}) 
} 