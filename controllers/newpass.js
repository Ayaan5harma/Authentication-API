const jwt = require('jsonwebtoken');
const Usermodel = require("../models/User");
const bcrypt = require('bcrypt');


const SetNewPassword = async (req,res)=>{

    const {pass,confirm_pass} = req.body;
    const {id,token} = req.params;

    const user = await Usermodel.findById(id);
    const NewSecret = user._id + process.env.JWT_SECRET_KEY;
    try {
         jwt.verify(token,NewSecret);
      if(id==user._id)
      {
        if(!pass || !confirm_pass)
        {
            res.send({"status":"failed" ,"message": "All fields are required"});;    
        }
       else  if(pass!==confirm_pass)
        {
            res.send({"status":"failed" ,"message": "password should be matched"});  
        }
        else{
           
           const NewHashPass = await bcrypt.hash(pass,12);
           await Usermodel.findByIdAndUpdate(id,{$set:{pass:NewHashPass}});
            res.send({"status":"success" ,"message": "Password reset sucessfully"});  
        }
      }
      else{
        res.send({"status":"failed" ,"message": "Unauthorized Acess"});
      }
   
    } catch (error) {
        console.log("error");
        console.log(error);
    }
    

}

module.exports = SetNewPassword;