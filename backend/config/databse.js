const mongoose = require('mongoose')
const databaseConnect = ()=>{
    mongoose.connect('mongodb+srv://Imtiaz:mongopass@cluster0.kuyem.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
        console.log('connected')
    }).catch((err)=>{
       console.log(err) 
    }) 
}
module.exports = databaseConnect
// imtiaza0182373
//wvKednc0BNhGvvGz