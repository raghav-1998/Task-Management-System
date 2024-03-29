import { User } from "../models/user.model.js"


const generateAccessTokenAndRefreshToken=async(userId)=>{
    try{
        const user=await User.findById(userId);
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken();

        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}
    }
    catch(error){
        throw new Error("Something went wrong while generating Access & Refresh Token")
    }
}

const registerUser=async(req,res,next)=>{
    try{
        const {fName,lName,userName,email,password}=req.body
        //console.log(email)

        if([fName,lName,userName,email,password].some((field)=>field?.trim()==="")){
            throw new Error("All fields are required")
        }

        const existingUser=await User.findOne({
            $or:[{userName},{email}]
        })

        //console.log(existingUser)
        if(existingUser){
            throw new Error("User already exists")
        }

        const user= await User.create({
            fName,lName,userName:userName.toLowerCase() ,email,password
        })

        const createdUser= await User.findById(user._id).select("-password -refreshToken")

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

const loginUser=async(req,res,next)=>{
    try{
        const {userName,email,password}=req.body
        if(!userName && !email){
            throw new Error("UserName or Email required")
        }

        const user=await User.findOne({
            $or:[{userName},{email}]
        })

        if(!user){
            throw new Error("User doesn't exist")
        }

        const isPasswordValid=await user.isPasswordCorrect(password)

        if(!isPasswordValid){
            throw new Error("Invalid Password")
        }

        const {accessToken,refreshToken}=await generateAccessTokenAndRefreshToken(user._id)

        const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

        console.log(loggedInUser)

        const options={
            httpOnly:true,
            secure:true
        }


        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json({
            statusCode:200,
            data:{user:loggedInUser,accessToken,refreshToken},
            message:"User Logged In Successfully"
        })
    }
    catch(error){
        next(error)
    }
} 

const logoutUser=async(req,res,next)=>{
    try {
        await User.findByIdAndUpdate(req.user._id,{
            $set:{
                refreshToken:undefined
            }
        },{
            new:true
        })

        const options={
            httpOnly:true,
            secure:true
        }

        return res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json({
            statusCode:200,
            data:{},
            message:"User Logged Out Successfully"
        })
        
    } catch (error) {
        next(error)
    }
}

const changeCurrentPassword=async(req,res,next)=>{
    try {
        const {oldPassword,newPassword}=req.body
        const user=await User.findById(req.user?._id)
        const isPasswordCorrect=await user.isPasswordCorrect(oldPassword)

        if(!isPasswordCorrect){
            throw new Error("Invalid Old Password")
        }

        user.password=newPassword
        await user.save({validateBeforeSave:false})

        return res
        .status(200)
        .json({
            statusCode:200,
            data:{},
            message:"Password Change Successfully"
        })
    } catch (error) {
        next(error)
    }
}

export {
    registerUser,
    loginUser,
    logoutUser,
    changeCurrentPassword
}