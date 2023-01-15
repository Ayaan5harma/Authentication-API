const Usermodel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ChangePassword =async(req,res)=>{
   const {pass , confirm_pass} = req.body;

   if(!pass || !confirm_pass)
   {
      res.send({"status":"failed","message":"All fields are required"});
      
   }
   else{
      if(pass!==confirm_pass)
      {
        res.send({"status":"failed","message":"Password should be matched"});
      }
      else{
        //  console.log(req.user);
        const newhashpassword = await bcrypt.hash(pass,12);
        
        await Usermodel.findByIdAndUpdate(req.user._id,{$set:{pass:newhashpassword}});
         res.send({"status":"success","message":"Password changed successfully"});
      }
   }
}

module.exports = ChangePassword