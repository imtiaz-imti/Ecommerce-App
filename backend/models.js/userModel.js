const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
   name:{
     type:String,
     required:[true,'please enter your name'],
     maxLength:[30,'name cannot exceed 30 characters'],
     minLength:[4,'name should have 4 characters or more']
   },
   email:{
    type:String,
    required:[true,'please enter your email'],
    unique: [true,'this email already exist'],
    validate:[validator.isEmail,'please enter a valid email']
  },
  password:{
    type:String,
    required:[true,'please enter your password'],
    minLength:[8,'password should have 8 characters or more'],
    select:false
  },
  avatar:{
    data: Buffer,
    contentType: String
  },
  role:{
    type:String,
    default:'user'
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date
})
userSchema.pre('save',async function(next){
  if(!this.isModified('password')){
    next()
  }
  this.password = await bcrypt.hash(this.password,10)
})
userSchema.methods.getJWTToken = function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}
userSchema.methods.comparePassword = async function(currentPassword){
  return await bcrypt.compare(currentPassword,this.password)
}
userSchema.methods.getResetPasswordToken = async function(){
  const resetToken = crypto.randomBytes(20).toString('hex')
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000
  return resetToken
}
module.exports = mongoose.model('user',userSchema)