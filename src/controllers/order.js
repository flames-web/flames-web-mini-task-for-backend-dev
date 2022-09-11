const Order = require('../models/order');

module.exports.postOrder = async (req,res) => {
    try {
        const {userId} = req;
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).send({status:false,message:'User doesnt exist'});
        }
        const cart = await Cart.findOne({userId});
        if(!cart){
            return res.status(400).send({status:false,message:'User cart does not exist'});
        }
        const order = new Order({
            cart,   
        })
        await order.save();
    } catch (error) {
        return res.status(error?.status || 500)
                  .send({status:false,message:error?.message || error});
    }
}