const {sendToken} = require('../extra')
const user = require('../models.js/userModel')
const ErrorHander = require('../utils/errorHandler')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const fs  = require('fs')
const createUser = async (req,res,next)=>{
   try{ 
     const {name,email,password} = req.body
     const userNew = await user.create({
        name,
        email,
        password,
        avatar:{
            public_id:'sample',
            url:'sample'
        }
     })
     sendToken(userNew,201,res)
   }catch(err){
    console.log(err.message)     
    return next(new ErrorHander(err.message,404).setCode(err.code))
   }
}
const loginUser = async (req,res,next)=>{
res.setHeader('Access-Control-Allow-Origin', 'https://ecommerce-sb7c.onrender.com')
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')  
return res.status(200).json({success:true,message:'user logged in successfully'})
   try{ 
     const {email,password} = req.body
     if(!email || !password){return next(new ErrorHander('please enter email and password',400))}
     const userNew = await user.findOne({email}).select('+password')
     if(!userNew){return next(new ErrorHander('invalid email or password',401))}
     if(!await userNew.comparePassword(password)){return next(new ErrorHander('invalid email or password',401))}
     sendToken(userNew,200,res)
   }catch(err){
    console.log(err.message)  
    return next(new ErrorHander(err.message,404))
   }
}
const logoutUser = async (req,res,next)=>{
   try{
      const options = {
         expires: new Date(Date.now()),
         httpOnly:true
      }
      res.status(200).setHeader('Access-Control-Allow-Origin', '*').cookie('token',null,options).json({success:true,message:'user logged out successfully'})
   }catch(err){
    return next(new ErrorHander(err.message,404))
   }
}
const forgotPassword = async (req,res,next)=>{
   try {
      const newUser = await user.findOne({email:req.body.email})
      if(!newUser){return next(new ErrorHander('user not found',404))}
      const resetToken = newUser.getResetPasswordToken()
      let resetTokenObject 
      await resetToken.then((obj)=>{resetTokenObject = obj})
      console.log(resetTokenObject)
      await newUser.save({validateBeforeSave:false})
      const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetTokenObject}`
      const message = `Your password reset token is :- \n\n${resetPasswordUrl}\n\nIf you have not requested this mail then, please ignore it`
      try {
         // await sendEmail({
         //    email:newUser.email,
         //    subject:'Ecommerce Password Recovery',
         //    message
         // })
         res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({success:true,message:`Email sent to ${newUser.email} successfully`}) 
      }catch(err){
         this.resetPasswordToken = undefined
         this.resetPasswordExpire = undefined
         await newUser.save({validateBeforeSave:false})
         return next(new ErrorHander(err.message,404)) 
      }  
   }catch (err) {
      return next(new ErrorHander(err.message,404)) 
   }
}
const resetPassword = async (req,res,next)=>{
   try {
      const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
      const newUser = await user.findOne({resetPasswordToken,resetPasswordExpire:{$gt:Date.now()}})
      if(!newUser){return next(new ErrorHander('Token is expired',404))}
      if(req.body.newPassword !== req.body.confirmPassword){return next(new ErrorHander('password not matching',404))}
      newUser.password = req.body.newPassword
      newUser.resetPasswordToken =  undefined
      newUser.resetPasswordExpire = undefined
      await newUser.save({validateBeforeSave:false})
      sendToken(newUser,200,res) 
   }catch (err) {
      return next(new ErrorHander(err.message,404)) 
   }
}
const getUserDetails = async (req,res,next)=>{
   try{
      const newUser = await user.findById(req.user.id)
      res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({success:true,newUser})
   }catch(err){
      return next(new ErrorHander(err.message,404))
   }
}
const changePassword = async (req,res,next)=>{
   try{
      const newUser = await user.findById(req.user.id).select('+password')
      if(!await newUser.comparePassword(req.body.previousPassword)){return next(new ErrorHander('password not correct',401))}
      if(req.body.newPassword !== req.body.confirmPassword){return next(new ErrorHander('password not matching',404))}
      newUser.password = req.body.newPassword
      await newUser.save({validateBeforeSave:false})
      res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({success:true,message:'password changed successfully'})
   }catch(err){
      return next(new ErrorHander(err.message,404))
   }
}
const updateProfile = async (req,res,next)=>{
   try{
      await user.findByIdAndUpdate(req.user.id,req.body,{new:true,runValidators:true,useFindAndModify:false})
      res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({success:true,message:'user profile updated successfully'})
   }catch(err){
      return next(new ErrorHander(err.message,404))
   }
}
const getAllUser = async (req,res,next)=>{
   try{
      const users = await user.find()
      res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({success:true,users})
   }catch(err){
      return next(new ErrorHander(err.message,404))
   }
}
const getSingleUser = async (req,res,next)=>{
   try{
      const singleUser = await user.findById(req.params.id)
      if(!singleUser){return next(new ErrorHander('user does not exist',404))}
      res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({success:true,singleUser})
   }catch(err){
      return next(new ErrorHander(err.message,404))
   }
}
const userUpdateProfileByAdmin = async (req,res,next)=>{
   try{
      const singleUser = await user.findById(req.params.id)
      if(!singleUser){return next(new ErrorHander('user does not exist',404))}
      await user.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false})
      res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({success:true,message:'user profile updated successfully'})
   }catch(err){
      return next(new ErrorHander(err.message,404))
   }
}
const userDeleteByAdmin = async (req,res,next)=>{
   try{
      const singleUser = await user.findById(req.params.id)
      if(!singleUser){return next(new ErrorHander('user does not exist',404))}
      await user.deleteOne(singleUser)
      res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({success:true,message:'user deleted successfully'})
   }catch(err){
      return next(new ErrorHander(err.message,404))
   }
}
const uploadProfilePicture = async (req,res,next)=>{
   try{
      const body = {
         avatar:{
            data: fs.readFileSync('./uploads/' + req.file.filename),
            contentType: 'image/png'
         }
      }
      await user.findByIdAndUpdate(req.user.id,body,{new:true,runValidators:true,useFindAndModify:false})
      res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({success:true,message:'picture uploaded successfully'})
   }catch(err){
      console.log(err.message)
      return next(new ErrorHander(err.message,404))
   }
}
module.exports = {createUser,loginUser,logoutUser,forgotPassword,resetPassword,getUserDetails,changePassword,updateProfile,getAllUser,getSingleUser,userUpdateProfileByAdmin,userDeleteByAdmin,uploadProfilePicture}
