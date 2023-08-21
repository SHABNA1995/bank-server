//import express
const express=require('express')
//import env file
require('dotenv').config()
//import cors
const cors=require('cors')
const router = require('./routes/router')

//import db connection
require('./db/connnection')
//import router
const rout=require('./routes/router')
//create server using express
const server=express()
//connect with frontend
server.use(cors())
//to covert all incoming json datas into js
server.use(express.json())
 
server.use(rout)

// server.get('/getpath/usernew',(req,res)=>{
//    res.send("get request response")


// })
// server.get('/getpath/userlast',(req,res)=>{
//     res.send("get  new request  response")
 
 
//  })
//set port
const port=3000|| process.env.port
//running config
server.listen(port,()=>{
   console.log(` 123 server started at port number ${port}`);
})