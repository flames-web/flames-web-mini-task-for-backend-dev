const express = require('express');
const router = express.Router();
const Cart = require('../../controllers/cart')
const {verifyToken} = require('../../middleware')

router.get('/addCart/:id',verifyToken, Cart.getAddCart);

module.exports = router;