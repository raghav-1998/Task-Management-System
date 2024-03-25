import { User } from "../models/user.model"

const registerUser=async(req,res,next)=>{
    try{
        const {fName,lName,userName,email,password}=req.body
        if([fName,lName,userName,email,password].some((field)=>field?.trim()==="")){
            throw new Error("All fields are required")
        }

        const existingUser=await User.find({
            $or:[{userName},{email}]
        })

        if(existingUser){
            throw new Error("User already exists")
        }

        const user= await User.create({
            fName,lName,userName:userName.toLowerCase() ,email,password
        })

        const createdUser= await User.findById(user._id).select("-password")

        if(!createdUser){
            throw new Error("Something went wrong while creating User")
        }

        return res.status(200).json({
            statusCode:200,
            data:createdUser,
            message:"User created successfully"
        })

    }
    catch(error){
        next(error)
    }
}