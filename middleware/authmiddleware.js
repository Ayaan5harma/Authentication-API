const jwt = require('jsonwebtoken');
const Usermodel = require("../models/User")


const CheckUserAuth = async (req,res,next)=>{
    
    const {authorization} = req.headers;
    let token ;
    if(authorization && authorization.startsWith('Bearer')){

        try {
            // extracting token from header
            token = authorization.split(' ')[1];

            // verify token

            const {userID} = jwt.verify(token,process.env.JWT_SECRET_KEY);

            // Get User from token
            req.user = await Usermodel.findById(userID).select('-pass');
            next();
        } catch (error) {
           console.log(error) ;
           res.status(401).send({"status": "failed", "message":"Unauthorized User"});
        }
    }
    if(!token)
    {
        res.status(401).send({"status": "failed", "message":"Unauthorized User", "token":"No token"}); 
    }
}

module.exports = CheckUserAuth