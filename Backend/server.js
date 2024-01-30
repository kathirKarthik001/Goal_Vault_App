const express = require('express')
const path = require('path')
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
app.use('/api/users' , require('./routes/userRoutes'))

// Serve frontend
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname ,'../frontend/build')))
    app.get('*',(req , res) => res.sendFile(path.resolve(__dirname,'../','frontend','build','index.html')) )
}
else{
    app.get('/',(req , res) => res.send('Server running in development'))
}
app.use(errorMiddleware)

app.listen(PORT,()=>{
    console.log(`server started listening  at PORT  ${PORT}`)
    
})

