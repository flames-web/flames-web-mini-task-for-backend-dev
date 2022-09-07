const mongoose = require('mongoose');
const {Schema} = mongoose;

const otpSchema = new Schema({
    otp:{
        type:Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires:60*60*60,
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
    all:otpSchema,
    token:{
        type:String,
    }
},opts);

module.exports = mongoose.model('User',userSchema);