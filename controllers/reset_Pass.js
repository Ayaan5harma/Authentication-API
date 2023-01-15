const jwt = require('jsonwebtoken');
const Usermodel = require('../models/User')
const transporter = require('../db/email');


const ResetPasswordSendEmail =async(req,res)=>{
    
    const {email} = req.body;
    if(email)
    {
       const UserWithEmail = await Usermodel.findOne({email:email}) ;
       if(!UserWithEmail)
       {
        res.send({"status": "failed","message": "No user with provided email found"});
       }
       else{
         const secret = UserWithEmail._id+process.env.JWT_SECRET_KEY;
         const token = jwt.sign({userID:UserWithEmail._id},secret,{expiresIn:'15m'});
         const link = `http://127.0.0.1:3000/api/user/newpassword/${UserWithEmail._id}/${token}`
         
        //  Send Rest Password Email 
           
        let info =await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: UserWithEmail.email,
            subject: 'Cake from paradise -password reset link !',
            html: `<a href= ${link}>Click Here<a/> to reset your password`


        }) 


        //  res.send({"status":"success","message":"Email with reset password has been sent to you","token": token ,"id":UserWithEmail._id });
        res.send({"status":"success","message":"Email with reset password has been sent to you"});
       }
    }
    else{
        res.send({"status": "failed","message": "email is required"});
    }
}

module.exports = ResetPasswordSendEmail;