const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
   name:{
     type:String,
     required:[true,'please enter product name'],
     trim:true
   },
   description:{
    type:String,
    required:[true,'please provide product description']
  },
  price:{
    type:Number,
    required:[true,'please enter product price'],
    maxLength:[8,'price cannot exit 8 characters']
  },
  rating:{
    type:Number,
    default:0
  },
  images:[{
    public_id:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
  }],
  category:{
    type:String,
    required:[true,'please enter product category']
  },
  stock:{
    type:Number,
    required:[true,'please enter product stock'],
    maxLength:[4,'stock cannot exceed 4 characters'],
    default:1
  },
  numOfReviews:{
    type:Number,
    default:0
  },
  reviews:[{
    name:{
       type:String,
       required:true
    },
    rating:{
        type:Number,
        required:true
     },
     comment:{
        type:String,
        required:true
     },
     reviewerID:String
  }],
  user:{
    type:mongoose.Schema.ObjectId,
    ref:'user',
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
})
module.exports = mongoose.model('product',productSchema)