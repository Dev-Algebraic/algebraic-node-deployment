const mongoose=require("mongoose");
const Schema=mongoose.Schema;


const UserSchema=new Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    phoneNo:Number, //
    role:String,

},{timestamps:true});






    
const data = mongoose.model('UserDetail',UserSchema,'UserDetail')
module.exports=data;