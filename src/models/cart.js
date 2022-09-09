const mongoose = require('mongoose')
const {Schema} = mongoose;
 

const cartSchema = new Schema({
    items: [
       {
        itemId:{
            type:Schema.Types.ObjectId,
            ref:'Item',
        },
        qty:{
            type:Number,
            default:0,
        },
        price:{
            type:Number,
            default: 0,
        },
        name:{
            type:String,
        },
       }
    ],
    totalQty:{
        type:Number,
        default:0,
        required:true
    },
    totalCost:{
        type:Number,
        default:0,
        required:true,
     },
     userId: {
        type:Schema.Types.ObjectId,
        ref:'User',
     },
     createdAt:{
        type:Date,
        default:Date.now(),
     }

 })

module.exports = mongoose.model('Cart',cartSchema)