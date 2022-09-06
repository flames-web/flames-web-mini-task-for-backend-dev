const express = require('express');
const router = express.Router();
const Item = require('../../controllers/item');

router.get('/items', Item.getAllItems);


module.exports = router;