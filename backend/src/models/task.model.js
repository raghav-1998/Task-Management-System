import mongoose from "mongoose";

const taskSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    },
    priority:{
        type:String,
        enum:['High','Medium','Low'],
        required:true

    },
    status:{
        type:String,
        enum:['Open','In Progress','Completed'],
        default:'Open'
    },
    addedBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
})

export const Task=mongoose.model("Task",taskSchema)