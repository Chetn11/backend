const mongoose=require("mongoose");

const todoSchema=mongoose.Schema({
    task:String,
    status:Boolean,
    tag:String,
    userEmail:String
    
})

const TodoModel=mongoose.model("todo",todoSchema);

module.exports={TodoModel}