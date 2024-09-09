const jwt = require('jsonwebtoken')
const user = require('./models.js/userModel')
const ErrorHander = require('./utils/errorHandler')
const extra = async (product,qname)=>{  
  let data = []  
  product = await product.find()
  product.forEach(element => {
    elementArray = element.name.split(' ')
    let allow = 0
    elementArray.forEach(strElement => {
        if(qname.includes(strElement.toLowerCase()) && allow === 0){
            data.push(element)
            allow = 1
        }
    })
  })
  return data
}
const objMatching = (obj1,obj2)=>{
  const obj2Keys = Object.keys(obj2)
  let gte = 0
  let lte = 0
  if('price' in obj2){
    gte = obj2.price.gte
    lte = obj2.price.lte
  } 
  if(obj2Keys.length === 0){return true}
  let match = false
  obj2Keys.forEach(element => {
    if(element === 'price'){
      if(Number(gte)<=Number(obj1[element]) && Number(obj1[element])<=Number(lte)){match = true}
    }
    else if(String(obj1[element]).toLowerCase() === String(obj2[element]).toLowerCase()){match = true}
  })
  return match
}
const sendToken = (userNew,statusCode,res)=>{
  const token = userNew.getJWTToken()
  const options = {
     expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
     httpOnly:true
  }  
return res.status(statusCode).cookie('token',token,options).setHeader('Access-Control-Allow-Origin', 'https://ecommerce-sb7c.onrender.com').setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTION').setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token').json({success:true,message:'user logged in successfully',token,userNew:userNew._id})
}
const isAuthenticatedUser = async (req,res,next)=>{
  try{
     const {token} = req.cookies
     if(!token){return next(new ErrorHander('please login to excess this resource',401))}
     const data =  jwt.verify(token,process.env.JWT_SECRET)
     req.user = await user.findById(data.id)
     next()
   }catch(err){
    return next(new ErrorHander(err.message,404))
   }
}
const isAuthorizedRole = (role)=>{
  return (req,res,next)=>{
    try{
      if(req.user.role !== role){return next(new ErrorHander('You are not allowed to excess this resource',403))}
      next()
    }catch(err){
     return next(new ErrorHander(err.message,404))
    }
  }
}
module.exports = {extra,objMatching,sendToken,isAuthenticatedUser,isAuthorizedRole}
