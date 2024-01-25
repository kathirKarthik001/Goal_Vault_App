const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.ObjectId,
            required:true,
            ref:'User'
        },
        text:{
            type:String,
            required:[true ,'please enter some text value']
        },
       
    },
    {
        timestamps: true
    }

)

module.exports = mongoose.model('Goal' , goalSchema)