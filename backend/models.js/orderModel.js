const mongoose = require('mongoose')
const currentDate = new Date()
const year = currentDate.getFullYear()
const month = currentDate.getMonth() + 1
const day = currentDate.getDate()
const hours = currentDate.getHours()
const minutes = currentDate.getMinutes()
const order = new mongoose.Schema({
    shippingInfo:{
        address:{type:String,required:true},
        city:{type:String,required:true},
        pinCode:{type:Number,required:true},
        phoneNumber:{type:Number,required:true}
    },
    orderItems:[{
        name:{type:String,required:true},
        price:{type:Number,required:true},
        quantity:{type:Number,required:true},
        image:{type:String,required:true},
        productID:{type:String,ref:'product',required:true}
    }],
    userID:{type:String,ref:'user',required:true},
    totalPrice:{type:Number,default:0,required:true},
    orderStatus:{type:String,required:true,default:'processing'},
    orderDate:{type:String,default:`${day}/${month}/${year}`},
    orderTime:{type:String,default:`${hours>12?hours-12:(hours===0?'00':hours)}:${minutes<10?'0'+minutes:minutes} ${hours >= 12 ? 'PM' : 'AM'}`},
    deliverDate:{type:String,default:`${day}/${month}/${year}`},
    deliverTime:{type:String,default:`${hours>12?hours-12:(hours===0?'00':hours)}:${minutes<10?'0'+minutes:minutes} ${hours >= 12 ? 'PM' : 'AM'}`}
})
module.exports = mongoose.model('order',order)