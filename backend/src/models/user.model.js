import mongoose from "mongoose";
import bcrypt from "bcrypt";

//Created User Schema
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    fName:{
        type:String,
        required:true,
    },
    lName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
    next();
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

//Exporting User model of schema userSchema
export const User=mongoose.model("User",userSchema);