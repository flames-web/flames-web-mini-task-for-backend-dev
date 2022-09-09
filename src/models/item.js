const mongoose = require('mongoose');
const {Schema} = mongoose;

const itemSchema = new Schema ({
    name:{
        type:String,
        required : true
    },
    description: {
        type:String,
    },
    price:{
        type:Number,
        required:true,
    },
    unit:{
        type:Number,
        required:true,
    },
    admin:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    createdAt:{
       type:Date,
       default: function(){
        return Date.now()
       }
    },
    updatedAt:{
        type:Date,
        default: function(){
            return Date.now()
        }
    }     
})

itemSchema.pre('save', function(done) {
    this.updatedAt = Date.now();
    done();
  });

module.exports = mongoose.model('Item',itemSchema);