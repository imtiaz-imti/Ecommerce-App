const express = require('express')
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
const router = require('./routes/orderRoute')
const errorHandler = require('./middleware/error')
const {sendToken} = require('./extra')
const cookieParser = require('cookie-parser')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1',product)
app.use('/api/v1/user',user)
app.use('/api/v1/order',router)
app.use(errorHandler)
app.use(sendToken)
app.use(cors({
  origin: '*',
  methods: ['GET','POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 600
}))
module.exports = app
