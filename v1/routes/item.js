const express = require('express');
const router = express.Router();
const Item = require('../../controllers/item');
const {verifyToken,validateItem} = require('../../middleware');

router.get('/',verifyToken,Item.getAllItems);

router.post('/new',verifyToken,validateItem,Item.newItem);

router.get('/:id',verifyToken,Item.getItem);

router.put('/:id',verifyToken,Item.updateItem);

router.delete('/:id',verifyToken,Item.deleteItem);

module.exports = router;