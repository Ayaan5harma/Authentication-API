const Usermodel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const LoginUser =async(req,res)=>{
 
    try {
        const {email ,pass} = req.body;

    if(!email || !pass)
    {
        res.send({"status":"failed","message":"All fields are required"});
    }
    else{
        const user = await Usermodel.findOne({email:email});
        if(!user)
        {
            res.send({"status":"failed","message":"No user found"}); 
        }
        else{
            const isMatch = await bcrypt.compare(pass,user.pass);
            if((user.email===email) && isMatch)
            {
                // Generate JWT token
                const token = jwt.sign({userID:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'});
                res.send({"status":"success","message":"Login successfully","token":token});    
            }
            else{
                res.send({"status":"failed","message":"invalid credentials"});    
            }
        }
    }
  
    } catch (error) {
       console.log(error) 
    }
   
}

module.exports = LoginUser