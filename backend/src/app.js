import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()

var corsOption={
    origin:process.env.CORS_ORIGIN,
    credentials:true
}
app.use(cors(corsOption))// Passing the options to configure CORS

app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true,limit:"20kb"}))

app.use(cookieParser())

import userRouter from './routes/user.routes.js'
app.use('/user',userRouter)

export default app;



