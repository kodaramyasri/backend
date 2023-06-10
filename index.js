const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.port|| 4000;
const mongoose=require("mongoose");
const Content = require("./schema");






app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())



app.use(cors())

mongoose.connect("mongodb+srv://ramyasrikoda:ramyasrikoda@cluster0.kzm1frs.mongodb.net/firstdb?retryWrites=true&w=majority")
    .then((err)=>{
        console.log("amngodb connected")
       })
    .catch((err)=>{
        console.log(err)
    })

console.log(Content)



app.get("/",(req,res)=>{
    res.send("API is working")
})


app.post("/store",(req,res)=>{
    const {username,password}=req.body
    console.log(username+password)
    const newData = new Content({
        username,password
    })
    newData.save()
})
app.get("/users",(req,res)=>{
    Content.find()
        .then((found)=>{
            res.json(found)
        })
})

app.listen(port,()=>console.log("server is running on port",port))