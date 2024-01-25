const asyncHandler = require('express-async-handler')
const User = require('../Models/userModel')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


// @desc Register new User
// @route  POST /api/users
// @access Public

const registerUser =  asyncHandler (  async (req , res) =>{

    const {name , email , password} = req.body
    
    if(!name ||!email ||!password  ){
        res.status(400)
        throw new Error('Please input all the data')
    }

     // checking whether the user exists

    const userExists = await User.findOne({email})

    if(userExists){                         
        res.status(400)
        throw new Error('User already exists')
    }

     // hashing the password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password , salt)

    // creating user

    const user = await User.create({
        name,
        email,
        password : hashedPassword 
    })

    if(user){
        res.status(201)
        res.json({
            _id : user.id,
            name:user.name,
            email:user.email,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid User data')

    }

})

// @desc Authenticate a user
// @route  POST /api/users/login
// @access Public

const loginUser =  asyncHandler (  async (req , res) =>{


    const {email , password } = req.body

    //finding the user exists or not
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password , user.password))){
        res.status(200)
        res.json({
            _id : user.id,
            name:user.name,
            email:user.email,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid login Credentials')
    }
})

// @desc Get user data
// @route  GET /api/users/me
// @access Private

const getMe =  asyncHandler (  async (req , res) =>{

    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }


    const { _id ,name , email } = await User.findById(req.user.id)

    res.status(200).json({
        id:_id,
        name,
        email
    })
})

// JWT Token genration
const generateToken = (id) =>{
    return jwt.sign({id} , process.env.JWT_SECRET ,{
        expiresIn:'30d'
    }) 
}

module.exports = {registerUser , loginUser , getMe }