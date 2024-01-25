const asyncHandler = require('express-async-handler')
const Goal = require('../Models/goalModel')
const User = require('../Models/userModel')

// @desc Get goals
// @route  GET /api/goals
// @access Private


const getGoals = asyncHandler (  async (req , res) =>{
    const goals = await Goal.find({user:req.user.id})

    res.status(200).json(goals)

})

// @desc Create goals
// @route  POST /api/goals
// @access Private

const createGoals =  asyncHandler (  async (req , res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error('send the text as input')
    }
    
    const goal = await Goal.create({
        text:req.body.text,
        user:req.user.id
    })

    res.status(200).json(goal)

} )

// @desc update goals
// @route  PUT /api/goals/:id
// @access Private

const updateGoals = asyncHandler (  async (req , res) =>{
    // checking whether the goal exists
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }


    // checking whether the user exist -- > cross checkig ==> in the user database

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //checking the user is the owner of the goal
    if(goal.user.toString() != user.id){
        res.status(401)
        throw new Error('unauthorized access')
    }


    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id ,req.body,{new:true})
    res.status(200).json(updatedGoal)
})



// @desc Delete goals
// @route  DELETE /api/goals/:id
// @access Private

const deleteGoals = asyncHandler (  async (req , res) =>{
    // checking whether the goal exists
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    // checking whether the user exist -- > cross checkig ==> in the user database

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //checking the user is the owner of the goal
    if(goal.user.toString() != user.id){
        res.status(401)
        throw new Error('unauthorized access')
    }

    await goal.deleteOne(); // Use deleteOne instead of remove() --> new version update

    res.status(200).json({
        id :req.params.id
    })
})



module.exports ={
    getGoals,
    createGoals,
    updateGoals,
    deleteGoals
}