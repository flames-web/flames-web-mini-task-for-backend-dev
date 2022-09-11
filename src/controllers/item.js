const Item = require('../models/item');

module.exports.getAllItems = async (req,res) => {
    try {
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const total = await Item.find({});
        const items = await Item.find({}).limit(pageSize).skip(pageSize * page);
       return  res.status(200).send({staus:'OK',message:'All Items',data:{items,
      meta:{
        total:total.length,
        skipped:pageSize * page,
        perPage:pageSize,
        page,
      }
    }})
    } catch (error) {
      return   res.status(error?.status || 500)
           .send({message:error?.message || error})
    }
}

module.exports.getItem = async (req,res) => {
    try {
        const {id} = req.params;
        const item = await Item.findById(id);
        if(item === null){
            return res.status(400).send({message:'the item with the provided /:id/ does not exist'});
        }
        return res.status(200).send({status:'OK',message:'Item details',data:item})
    } catch (error) {
        return res.status(error?.status || 500)
                  .send({message:error?.message || error})
    }
}

module.exports.newItem = async (req,res) => {
    try {
        const {name,description,price,unit}  = req.body;
        const item = new Item({
            name,
            description,
            price,
            unit
        })
        await item.save();
       return res.status(200).send({status:'Ok',message:'Item sucessfully created',data:item})
    } catch (error) {
        return   res.status(error?.status || 500)
          .send({message:error?.message || error})
    }   
}

module.exports.updateItem = async (req,res) => {
       try {
        const {id} = req.params;
        const {name,description,price,unit} = req.body;
        const item = await Item.findById(id);
        if(item === null){
            return res.status(400).send({message:'Item with the provided /:id/ does not exist'});
        }
        const updatedItem =  await Item.findByIdAndUpdate(id,{
         name,
         description,
         price,
         unit,   
         updatedAt : Date.now(),
        })
        await updatedItem.save();
        return res.status(200).send({message:'Updated Item',data:item});
       } catch (error) {
        return res.status(error?.status || 500)
           .send({message:error?.message || error})
       }
}

module.exports.deleteItem = async (req,res) => {
    try {
        const {id} = req.params;
        await Item.findByIdAndDelete(id);
        return res.status(200).send({status:'Ok',message:'Item sucessfully deleted'});
    } catch (error) {
     return   res.status(error?.status || 500)
           .send({message:error?.message || error})
    }
    
}