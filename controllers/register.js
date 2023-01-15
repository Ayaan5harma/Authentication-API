const Usermodel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const RegisterUser = async(req,res)=>{

    const {name,email,pass,confirm_pass} = req.body;
    

    try {
      if(!name || !email || !pass || !confirm_pass)
      {
        res.send({'status': 'failed' ,'message': 'All fields are required'});
        
      }
      else{
            const user = await Usermodel.findOne({email:email});
            if(user)
            {
                res.send({'status': 'failed' ,'message': 'User already exists'});   
            }
            else{
                if(pass !==confirm_pass)  
                {
                   res.send({'status': 'failed' ,'message': 'password should be matched'}); 
                }
                else{
                    const hashPassword = await bcrypt.hash(pass,12);
                    
                    const newuser = new Usermodel({
                        name: name,
                        email: email,
                        pass: hashPassword,
                        tc : req.body.tc
                    })
                        
                    const response = await newuser.save();
                    if(response)
                    {
                        
                        const saved_user =await Usermodel.findOne({email:email}) 
                        
                        // Generating JWT token

                        const token = jwt.sign({userID:saved_user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
                        res.send({'status': 'success' ,'message': 'Registered successfully',"token":token});
                    }
                    else{
                        res.send({'status': 'failed' ,'message': 'failed to Register'});   
                    }
                }
            }
         }
      }
     catch (error) {
        console.log(error);

    }

}

module.exports = RegisterUser;

