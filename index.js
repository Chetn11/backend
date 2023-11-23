const express=require("express");
require("dotenv").config();
const {connection}=require("./configs/db");
const {UserModel}=require("./models/User.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {todoRouter}=require("./routes/Todo.routes");
const{auth}=require("./middelware/auth")
const cors=require("cors")

const app=express();

app.use(express.json());
app.use(cors({
    origin:"*"
}))

app.get("/",(req,res)=>{
    res.json({message:"Api is Working"});
})

//signup
app.post("/signup", async (req,res)=>{
    const {name,email,password}=req.body;
    const user_exist=await UserModel.findOne({email});
    if(user_exist)
    {
      return  res.json({message:"User already exist please go to login page"})
    }
    bcrypt.hash(password,8,async function(err, hash){
        await UserModel.create({name,email,password:hash});
       return res.json({message:"Signup Successfull"});
    })
    

    
})

//login
app.post("/login", async (req,res)=>{
    const {email,password}=req.body;
    const user=await UserModel.findOne({email});
    if(!user)
    {
        return res.json({message:"Please signup first"});
    }
    const hashed_pass=user?.password;

    bcrypt.compare(password, hashed_pass, function(err,result){
        if(result){
            const token = jwt.sign({userId:user._id}, 'key');
            return res.json({message:"Login Successfull", token:token});
        }
        else{
            return res.json({message:"invalid credential login failed"});
        }
    })
    
})

app.use(auth);
app.use("/todos",todoRouter);

app.listen(process.env.port || 8080,async ()=>{
    try {
        await connection;
        console.log("Connected to Mongodb");
    } catch (error) {
        console.log("error while connecting to DB");
        console.log(error)
    }
    console.log("listening on port 8080");
})