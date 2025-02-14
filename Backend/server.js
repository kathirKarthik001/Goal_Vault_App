const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config()
const { errorMiddleware } = require('./middleware/errorMiddleware')
const colors = require('colors')
const connectDB = require('./config/db')
const cors = require('cors');

// DB connectivity 
connectDB()


const PORT = process.env.PORT || 5000
const app = express()

// CORS configuration
app.use(cors({
    origin: 'https://goal-vault.vercel.app', // Frontend URL (no trailing slash)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
    credentials: true, // Allow cookies or credentials 
  }));

// Handle preflight requests
app.options('*', cors());

//req - parsers
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes
app.use('/api/goals' , require('./routes/goalsRoutes'))
app.use('/api/users' , require('./routes/userRoutes'))

//middlewares
app.use(errorMiddleware)

app.listen(PORT,()=>{
    console.log(`server started listening  at PORT  ${PORT}`)
    
})

