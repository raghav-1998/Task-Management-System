import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("Error",error)
        process.exit(1)
    })
    app.listen(process.env.PORT,()=>{
        console.log("App is listening on port",process.env.PORT)
    })
})
.catch((error)=>{
    console.log("Mongo DB connection failed:",error)
})