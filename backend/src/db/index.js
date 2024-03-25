import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB=async()=>{
    try{
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`Connection Successful !! DB Host: ${connectionInstance.connection.host}`)
    }
    catch(error){
        console.log("Error:",error)
        throw error
    }
}

export default connectDB;