const Order = require('../models/order');

module.exports.postOrder = async (req,res) => {
    try {
        const {userId} = req;
        const {address} = req.body;
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).send({status:false,message:'User doesnt exist'});
        }
        const cart = await Cart.findOne({userId});
        if(!cart){
            return res.status(400).send({status:false,message:'User cart does not exist'});
        }
        const order = new Order({
            cart:
            address,   
        })
        await order.save();
    } catch (error) {
        return res.status(error?.status || 500)
                  .send({status:false,message:error?.message || error});
    }
}

module.exports.getOrder = async (req,res) => {
    try {
         const {id} = req.params;
         const order = await Order.findById(id);
         if(!order) {
            return res.status(400).send({status:false,message:'This user does not have any order'});
         }
         return res.status(200).send({status:true,message:'User Order',data:order})
    } catch (error) {
        return res.status(error?.status || 500)
                  .send({status:false,message:error?.message})
    }
}

module.exports.orders = async (req,res) => {
    try {
        const orders = await Order.find({});
        if(orders == null){
            return res.status(404).send({status:false,message:'This User doesnt have any order made'});
        }
        res.status(200).send({status:true,message:'All orders',data:orders});
    } catch (error) {
        return res.status(error?.status || 500)
                  .send({status:false,message:error?.message || error});
    }
}