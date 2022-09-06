const Item = require('../models/item');

module.exports.getAllItems = async (req,res) => {
    try {
        const items = await Item.find({});
        res.status(200).send({staus:'OK',message:'All Items',data:{items},})
    } catch (error) {
        res.status(error?.status || 500)
           .send({message:error?.message || error})
    }
}



