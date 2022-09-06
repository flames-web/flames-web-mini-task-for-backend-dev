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
    if(user && !userCart){
        cart = await new Cart(req.session.cart);       
    }else {
      cart = userCart;
    }
    const item = await Item.findById(id);    
    const itemIndex = cart.items.findIndex(p => p.itemId == id);
    if(itemIndex > -1){
        cart.items[itemIndex].qty++;
        cart.items[itemIndex].price = cart.items[itemIndex].qty * item.price;
        cart.totalQty++;
        cart.totalCost += item.price;
    }else {
        cart.items.push({
            itemId: id,
            name:item.name,
            qty:1,
            price:item.price,
        });
        cart.totalQty++;
        cart.totalCost += item.price
    }
    if(user){
        cart.userId = user._id;
        await cart.save();
    } 
       req.session.cart = cart; 
       return  res.status(200).send({message:'Item sucessfully added to cart'});

    }catch(error){
      return  res.status(error?.status || 500)
           .send({message:error?.message || error,stack:error?.stack})
    }
}