const app = require('./app')
const databaseConnect = require('./config/databse')
const dotenv = require('dotenv')
dotenv.config({path:'config/config.env'})
process.on('uncaughtException',(err)=>{
   console.log(`Error:${err.message}`)
   console.log('shutting down the server')
   process.exit(1)
})
const server = app.listen(process.env.PORT,()=>{
   console.log('server is running') 
})
databaseConnect()
process.on('unhandledRejection',(err)=>{
   console.log(`Error:${err.message}`)
   console.log('shutting down the server')
   server.close(()=>{
      process.exit(1)
   })
})