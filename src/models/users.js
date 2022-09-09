const mongoose = require('mongoose');
const {Schema} = mongoose;

const otpSchema = new Schema({
    code:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires:20,
    },
})
const opts = { toJSON: { virtuals: true } };

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    otp:otpSchema,
},opts);

module.exports = mongoose.model('User',userSchema);