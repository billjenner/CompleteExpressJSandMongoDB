const mongoose = require('mongoose')

const User = mongoose.Schema({
    // ID automatically assigned by Mongo
    name:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    date: {
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', User)