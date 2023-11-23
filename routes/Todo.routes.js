const express=require("express");
const {TodoModel}=require("../models/Todo.model");
const { UserModel } = require("../models/User.model");



const todoRouter=express.Router();


todoRouter.get("/",async (req,res)=>{
    const todo=await TodoModel.find({})
    res.send({todo:todo});
})

// create
todoRouter.post("/create",async (req,res)=>{
    const{task,status,tag}=req.body;

    const userID=req.userID;

    const user=await UserModel.findOne({_id:userID})

    const userEmail=user.email;

    const todo=await TodoModel.create({task,status,tag,userEmail})
    res.send({todo:todo});
})


//update
todoRouter.patch("/edit/:todoID",async (req,res)=>{
    const todoID=req.params.todoID;

    const userID=req.userID;
    const user=await UserModel.findOne({_id:userID});
    const userEmail=user.email;

    const payload=req.body
    await TodoModel.findOneAndUpdate({_id:todoID, userEmail:userEmail},payload);
    res.send({message:`Todo ${todoID} updated`})

})

//delete
todoRouter.delete("/delete/:todoID",async (req,res)=>{
    const todoID=req.params.todoID;

    const userID=req.userID;
    const user=await UserModel.findOne({_id:userID});
    const userEmail=user.email;

    await TodoModel.findOneAndDelete({_id:todoID, userEmail:userEmail});
    res.send({message:`Todo ${todoID} deleted`})

})


module.exports={todoRouter}