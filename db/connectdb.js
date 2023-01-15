const mongoose = require('mongoose');

const connectDB = async(mongo_url)=>{

     try {
        mongoose.set('strictQuery', false);
      await  mongoose.connect(mongo_url); 
      console.log("database connected");
     } catch (error) {
        console.log(error);
     }
}

module.exports = connectDB;