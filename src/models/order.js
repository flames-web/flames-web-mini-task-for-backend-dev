const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({
    cart: { 
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
    }
  },
    address: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    Delivered: {
      type: Boolean,
      default: false,
    },
})