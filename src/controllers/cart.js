const Cart = require('../models/cart');
const Item = require('../models/item');
const User = require('../models/users');


module.exports.getAddCart = async (req,res) => {
    try{
    const {id} = req.params;
    const {userId} = req;
    const user = await User.findById(userId);
    let userCart;
    if(user){
        userCart = await Cart.findOne({userId});
    }
    let cart;
    const item = await Item.findById(id);
    if(userCart){
        cart = userCart;
        const itemIndex = cart.items.findIndex(p => p.itemId == id);
        if(itemIndex > -1){
            cart.items[itemIndex].qty++;
            cart.items[itemIndex].price = cart.items[itemIndex].qty * item.price;
            cart.totalQty++;
            cart.totalCost += item.price}
            else{
                cart.items.push({
                    itemId: id,
                    name:item.name,
                    qty:1,
                    price:item.price,
                });
                cart.totalQty++;
                cart.totalCost += item.price
            }
            cart.userId = user._id;
            await cart.save();
    }else{
        cart =  Cart.create({
            items:{
                itemId: id,
                name:item.name,
                qty:1,
                price:item.price,
            },
            totalQty : 1,
            totalCost: item.price,
            userId : user._id
        });
    }
       return  res.status(200).send({message:'Item sucessfully added to cart'});

    }catch(error){
      return  res.status(error?.status || 500)
           .send({message:error?.message || error,stack:error?.stack})
    }
}

module.exports.remove = async (req,res) => {
    try {
        const {id} = req.params;
    const {userId} = req;
    const user = User.findById(userId);
    let cart;
    if(!user){
        return res.status(400).send({message:'Verification failed'});        
    }
    cart = await Cart.findOne({userId});
    if(!cart){
        return res.status(400).send({status:false,status:'Not Found',message:'User cart doesnt exist'})
    }
    const item = await Item.findById(id);
    const itemIndex = cart.items.findIndex(c => c.itemId == id);
    if(itemIndex > -1){
        cart.items[itemIndex].qty--;
        cart.items[itemIndex].price = cart.items[itemIndex].qty * item.price;
        cart.totalQty--;
        cart.totalCost -= item.price
        if (cart.items[itemIndex].qty <= 0) {
            await cart.items.remove({ _id: cart.items[itemIndex]._id });
          }
        if (cart.totalQty <= 0) {
            await Cart.findByIdAndRemove(cart._id);
        }
    }
    cart.userId  = userId;
    await cart.save();
    return res.status(200).send({status:true,message:'Item sucessfully removed from cart'});

    } catch (error) {
        return res.status(error?.status || 500)
                  .send({status:false,message:error?.message || error})
    }
}

module.exports.carts = async (req,res) => {
   try{
    const {userId} = req;
    const carts = await Cart.findOne({userId});
    if(!carts){
        return res.status(400).send({status:false,message:'This user does to have any item availiable in its cart'});
    }
    return res.status(200).send({status:'OK',message:'User Cart',data:carts})
   } catch(error) {
    return res.status(error?.status || 500)
              .send({message:error?.message || error});
   }
}

module.exports.removeAllCarts = async (req,res) => {
    try{
        const {userId} = req;
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).send({status:false,message:'User does not exist'});
        }
        const cart = await Cart.findOneAndDelete({userId});
        return res.status(200).send({status:true,message:'User cart sucessfully cleared'});
    } catch (error) {
        return res.status(error?.status || 500)
                 .send({status:false,message:error?.message || error});
    }
}