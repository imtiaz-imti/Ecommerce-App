const product = require('../models.js/productModel')
const ApiFeatures = require('../utils/apiFeatures')
const ErrorHander = require('../utils/errorHandler')
const {extra} = require('../extra')
const createProduct = async (req,res,next)=>{
  try{
    req.body.user = req.user.id
    const data = await product.create(req.body)
    res.status(201).setHeader('Access-Control-Allow-Origin', '*').json({success:true,message:'product created successfully',data})
  }catch(err){
    return next(new ErrorHander(err.message,404))
  } 
}
const getAllProduct = async (req,res,next)=>{
  try{
    const apiFeatures = await new ApiFeatures(req.query).search()
    let data = apiFeatures.query
    if(data.length === 0){
      let ele = await extra(product,req.query.keyword.split(' ').map(word=>word.toLowerCase()))
      if(ele.length>0){
        ele = (await apiFeatures.filter(ele)).query
        if(ele.length === 0){return next(new ErrorHander('product not found',404))}
        return res.status(200).setHeader('Access-Control-Allow-Origin', '*').json(ele)
      }
      return next(new ErrorHander('product not found',404))
    }
    data = (await apiFeatures.filter(data)).query
    if(data.length === 0){return next(new ErrorHander('product not found',404))}
    res.status(200).setHeader('Access-Control-Allow-Origin', '*').json(data)
  }catch(err){
    console.log(err.message)
    return next(new ErrorHander('Server Error',404))
  } 
}
const updateProduct = async (req,res,next)=>{
  try{
    const data = await product.findById(req.params.id)
    if(!data){return next(new ErrorHander('product not found',404))}
    await product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false})
    res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({success:true,message:'product updated successfully',data})
  }catch(err){
    console.log(err.message)
    return next(new ErrorHander('Server Error',404))
  }
}
const deleteProduct = async (req,res,next)=>{
    try{
      const data = await product.findById(req.params.id)
      await product.deleteOne(data)
      res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({success:true,message:'product deleted successfully'})
    }catch(err){
      return next(new ErrorHander('Server Error',404))
    }
}
const getProductDetails = async (req,res,next)=>{
  try{
    const data = await product.findById(req.params.id)
    res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({success:true,data})
  }catch(err){
    return next(new ErrorHander('Server Error',404))
  }
}
const userReview = async (req,res,next)=>{
  try{
    const ele = await product.findById(req.params.id)
    if(!ele){return next(new ErrorHander('product not found',404))}
    let reviewer = ele.reviews.find((element)=>element.reviewerID === req.user.id)
    if(reviewer){
      reviewer.rating = req.body.rating
      reviewer.comment = req.body.comment
      let avg = 0
      ele.reviews.forEach((element)=>{avg+=element.rating})
      ele.rating = avg/ele.reviews.length 
      await ele.save({validateBeforeSave:false})
      return res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({success:true,message:'review updated successfully',ele})
    }
    const rev = {
      name:req.user.name,
      rating:Number(req.body.rating),
      comment:req.body.comment,
      reviewerID:req.user.id
    }
    let avg = 0
    ele.reviews.push(rev)
    ele.numOfReviews = ele.reviews.length
    ele.reviews.forEach((element)=>{avg+=element.rating})
    ele.rating = avg/ele.reviews.length 
    await ele.save({validateBeforeSave:false})
    res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({success:true,message:'review added successfully',ele})
  }catch(err){
    return next(new ErrorHander(err.message,404))
  }
}
const getAllReview = async (req,res,next)=>{
  try{
    const ele = await product.findById(req.params.id)
    if(!ele){return next(new ErrorHander('product not found',404))}
    res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({success:true,reviews:ele.reviews})
  }catch(err){
    return next(new ErrorHander(err.message,404))
  }
}
const deleteReview = async (req,res,next)=>{
  try{
    const ele = await product.findById(req.params.productID)
    if(!ele){return next(new ErrorHander('product not found',404))}
    let data = []
    ele.reviews.forEach((element)=>{
       if(element.reviewerID !== req.params.reviewerID){data.push(element)}
    })
    ele.reviews = data
    let avg = 0
    ele.numOfReviews = ele.reviews.length
    ele.reviews.forEach((element)=>{avg+=element.rating})
    ele.rating = avg/ele.reviews.length
    await ele.save({validateBeforeSave:false})
    res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({success:true,message:'review deleted successfully',ele})
  }catch(err){
    return next(new ErrorHander(err.message,404))
  }
}  
module.exports = {getAllProduct,createProduct,updateProduct,deleteProduct,getProductDetails,userReview,getAllReview,deleteReview}
