import express from "express"

const app=express()

var corsOption={
    origin:process.env.CORS_ORIGIN,
    credentials:true
}
app.use(cors(corsOption))// Passing the options to configure CORS

app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true,limit:"20kb"}))

app.get('/',(req,res)=>{
    res.send("<h1>Welcome To TaskBook</h1>")
})


app.get('/login',(req,res)=>{
    res.send("<h2>Please Login</h2>")
})

export default app;



