const express = require('express');
const router = express.Router();
const Item = require('../../controllers/item');
const {verifyToken,validateItem} = require('../../middleware');

router.get('/',verifyToken,Item.getAllItems);

router.post('/new',verifyToken,validateItem,Item.newItem);

router.route('/:id')
   .get(verifyToken,Item.getItem)
   .put(verifyToken,Item.updateItem)
   .delete(verifyToken,Item.deleteItem)

module.exports = router;