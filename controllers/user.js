const User = require('../models/users');

module.exports.getAllUers = async (req,res) => {
   try{
    const users = await User.find({});
    res.status(200).send({message:'All Users',data:users});
   }catch(error){
    res.status(error?.status || 500)
       .send({message:error?.message || error})
   }
}

