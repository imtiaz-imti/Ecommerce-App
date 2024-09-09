const order = require('../models.js/orderModel')
const product = require('../models.js/productModel')
const ErrorHander = require('../utils/errorHandler')
const createOrder = async (req,res,next)=>{
    try{
      req.body.userID = req.user.id  
      const newOrder = await order.create(req.body)
      res.status(201).setHeader('Access-Control-Allow-Origin', '*').json({success:true,message:'order created successfully',newOrder})
    }catch(err){
      console.log(err.message)
      return next(new ErrorHander(err.message,404))
    } 
}
const getSingleOrderDetailsAdmin = async (req,res,next)=>{
  try{  
    const newOrder = await order.findById(req.params.id)
    if(!newOrder){return next(new ErrorHander('order not found',404))}
    res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({success:true,newOrder})
  }catch(err){
    return next(new ErrorHander(err.message,404))
  } 
}
const getSingleOrderDetailsUser = async (req,res,next)=>{
  try{  
    const newOrder = await order.find({userID:req.user.id})
    if(!newOrder){return next(new ErrorHander('you have not ordered yet',404))}
    res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({success:true,newOrder})
  }catch(err){
    return next(new ErrorHander(err.message,404))
  } 
}
const getAllOrder = async (req,res,next)=>{
  try{  
    const newOrder = await order.find()
    let totalAmount = 0
    newOrder.forEach(ele=>{
       totalAmount+=ele.totalPrice
    })
    if(newOrder.length === 0){return next(new ErrorHander('no ordered yet',404))}
    res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({success:true,totalAmount,newOrder})
  }catch(err){
    return next(new ErrorHander(err.message,404))
  } 
}
const updateOrderStatus = async (req,res,next)=>{
  try{
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    const day = currentDate.getDate()
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes() 
    const newOrder = await order.findById(req.params.id)
    if(!newOrder){return next(new ErrorHander('order not found',404))}
    newOrder.orderStatus = 'delivered'
    newOrder.orderItems.forEach(async (element)=>{
      const deliveredProduct = await product.findById(element.productID)
      deliveredProduct.stock-=element.quantity
      await deliveredProduct.save({validateBeforeSave:false})
    })
    newOrder.deliverDate = `${day}/${month}/${year}`
    newOrder.deliverTime = `${hours>12?hours-12:(hours===0?'00':hours)}:${minutes<10?'0'+minutes:minutes} ${hours >= 12 ? 'PM' : 'AM'}`
    await newOrder.save({validateBeforeSave:false})
    res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({success:true,newOrder})
  }catch(err){
    return next(new ErrorHander(err.message,404))
  } 
}
const deleteOrder = async (req,res,next)=>{
  try{  
    const newOrder = await order.findById(req.params.id)
    if(!newOrder){return next(new ErrorHander('order not found',404))}
    await order.deleteOne(newOrder)
    res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({success:true,message:'order deleted successfully'})
  }catch(err){
    return next(new ErrorHander(err.message,404))
  } 
}
module.exports = {createOrder,getSingleOrderDetailsAdmin,getSingleOrderDetailsUser,getAllOrder,updateOrderStatus,deleteOrder}
