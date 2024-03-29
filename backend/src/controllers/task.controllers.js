import { Task } from "../models/task.model.js"

const createTask=async(req,res,next)=>{
    try {
        const {title,description,dueDate,priority,status}=req.body

        if([title,description,dueDate,priority].some((field)=>field?.trim()==='')){
            throw new Error("All fields are required")
        }

        const userId=req.user._id

        const task=await Task.create({
            title,description,dueDate,priority,status,addedBy:userId
        })

        const createdTask=await Task.findById(task._id)

        if(!createdTask){
            throw new Error("Something went wrong while creating task")
        }

        return res
        .status(200)
        .json({
            statusCode:200,
            data:createdTask,
            message:"Task created successfully"
        })
    } catch (error) {
        next(error)
    }
}


const deleteAllTasksOfUser=async(req,res,next)=>{
    
}
export{
    createTask
}