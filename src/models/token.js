const mongoose = require('mongoose');
const {Schema} = mongoose;

const otpSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:3600,
    }
})

module.exports = mongoose.model('OTP',otpSchema);