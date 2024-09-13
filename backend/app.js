const express = require('express')
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
const router = require('./routes/orderRoute')
const errorHandler = require('./middleware/error')
const {sendToken} = require('./extra')
const cookieParser = require('cookie-parser')
const app = express()
const cors = require('cors')
app.use(cookieParser())
app.use(cors({
    origin: 'https://ecommerce-sb7c.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))
app.use(express.json())
app.use('/api/v1',product)
app.use('/api/v1/user',user)
app.use('/api/v1/order',router)
app.use(errorHandler)
app.use(sendToken)
module.exports = app
