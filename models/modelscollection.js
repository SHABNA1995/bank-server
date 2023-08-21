const mongoose=require('mongoose')
const users=new mongoose.model("users",{
    acno:Number,
    uname:String,
    psw:String,
    balance:Number,
    transaction:[]
})
module.exports=users