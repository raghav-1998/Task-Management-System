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

const getAllTasks=async(req,res,next)=>{
    try {
        try {
            const userId=req.user._id
        
            const tasks=await Task.find({addedBy:userId})

            if(tasks.length===0){
                return res
                .status(404)
                .json({
                    statusCode:404,
                    message:"No task found for this User"
                })
            }

            return res
            .status(200)
            .json({
                statusCode:200,
                data:tasks,
                message:"Tasks fetched successfully"
            })
            
        } catch (error) {
            throw new Error("Something went wrong while fetch User's Tasks")
        }
    } catch (error) {
        next(error)
    }   
}

/*
const getTaskById=async(req,res,next)=>{
    try {
        req.param.
        
    } catch (error) {
        next(error)
    }
}
*/

const deleteAllTasks=async(req,res,next)=>{
    try {
        try {
            const userId=req.user._id

            const tasks=await Task.find({addedBy:userId})

            if(tasks.length===0){
                return res
                .status(404)
                .json({
                    statusCode:404,
                    message:"No task found for this User"
                })
            }

            await Task.deleteMany({addedBy:userId})

            return res
            .status(200)
            .json({
                statusCode:200,
                message:"Task deleted sucessfully"
            })
        } catch (error) {
            throw new Error("Error while deleting tasks of user")
        }
    } catch (error) {
        next(error)
    }
}

const deleteTaskById=async(req,res,next)=>{
    try {
        try {
            const {taskId}=req.params
        
            const taskToBeDeleted=await Task.findById(taskId)
        
            if(!taskToBeDeleted){
                throw new Error("Task Not found")
            }
        
            await Task.findByIdAndDelete(taskId)
        
            return res
            .status(200)
            .json({
                statusCode:200,
                message:"Task Deleted Successfully"
            })

        } catch (error) {
            throw new Error("Error while deleting task of User")
        }
    } catch (error) {
        next(error)
    }
}

export{
    createTask,
    getAllTasks,
    deleteAllTasks,
    deleteTaskById
}