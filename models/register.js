const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const regisSchmema = new mongoose.Schema({
   name : {
     type: String,
     required: true,
     
   },
   email: {
    type:String,
    required: true,
    unique: true,
   },

   password: {
   type: String,
   required: true,

   },

   reEnterpassword:{
    type:String,
    required : true,
   },
   tokens : [
    {
      token :{
        type:String,
        required : true,
      }
    }
   ]
})



regisSchmema.pre('save' , async function (next){
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 12)
    this. reEnterpassword = await bcrypt.hash(this.reEnterpassword, 12)
  }
  next()
})

regisSchmema.methods.generateToken = async function(){
  try{
   
    const token = jwt.sign({_id:this._id}, process.env.SEKRET_KEY);
    this.tokens = this.tokens.concat({token:token})
    await this.save()
    return token;
  }catch(err){
    console.log("this is nan error" + err)
  }
} 


const Register = new mongoose.model("User",regisSchmema)

module.exports = Register;



