const product = require('../models.js/productModel')
const {objMatching} = require('../extra')
class ApiFeatures{
   constructor(qrstr){
     this.qrstr = qrstr
   }
   async search(){
     return this.qrstr 
     this.query = await product.find()
     let keyword = [] 
     // const keyword = this.qrstr ? product.map(ele => ele.name.toLowerCase() === Object.keys(this.qrstr)[0].toLowerCase()) : 'Empty'
     this.query.forEach((ele)=>{
       if(ele.name.toLowerCase() === Object.keys(this.qrstr)[0].toLowerCase()){
         keyword.push(ele) 
       } 
     }) 
     return keyword
     if(keyword === 'Empty'){return this}
     this.query = await product.find(keyword)
     return this 
   }
   async filter(ele){
     const limit = Number(this.qrstr.limit) || 20
     let data = []
     this.query = ele
     const queryNew = {...this.qrstr}
     const removeFields = ['keyword','page','limit']
     removeFields.forEach(element => {delete queryNew[element]})
     this.query.forEach((ele)=>{
       if(objMatching(ele,queryNew)){
         data.push(ele)
       }
     })
     if(Number(this.qrstr.page)>=1){
      let pageCount = 1
      let eleCount = 0
      let newData = []
      data.forEach(element => {
         if(pageCount === Number(this.qrstr.page)){newData.push(element)}
         eleCount++
         if(eleCount === limit){
           pageCount++
           eleCount = 0
         }       
      })
      data = newData
     }
     else if(limit>=1){
       data = data.slice(0,limit)
     } 
     this.query = data
     return this 
   }
}
module.exports = ApiFeatures
