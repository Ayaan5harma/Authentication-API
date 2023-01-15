const mongoose = require('mongoose');

const User_Schema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'name should be provided'],
        trim:true
    },
    email:{
        type: String,
        required:[true, 'email should be provided'],
        trim:true
    },
    pass:{
        type: String,
        required: [true, 'password should be provided'],
        trim:true
    },
    tc:{
        type: Boolean,
        required: true,
        trim: true
    }
})

const User = mongoose.model("User",User_Schema);

module.exports = User;