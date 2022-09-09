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


module.exports.getUser = async (req,res) => {
   try{
      const {id} = req.params;
      const user = await User.findById(id);
      if(user === null){
         return res.status(400).send({message:'The user with the given /:id/ does not exist'});
      }
      return res.status(200).send({status:'OK',message:'User',data:user});
   } catch(error) {
      return res.status(error?.status || 500)
                .send({message:error?.message || error})
   }
}
