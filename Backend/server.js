const express = require('express')
const dotenv = require('dotenv').config()
const { errorMiddleware } = require('./middleware/errorMiddleware')
const colors = require('colors')
const connectDB = require('./config/db')

// DB connectivity 
connectDB()


const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals' , require('./routes/goalsRoutes'))

app.use(errorMiddleware)

app.listen(PORT,()=>{
    console.log(`server started listening  at PORT  ${PORT}`)
})

