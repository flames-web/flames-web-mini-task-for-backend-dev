const express = require('express');
const router = express.Router();
const Cart = require('../../controllers/cart')
const {verifyToken} = require('../../middleware')

router.get('/add/:id',verifyToken, Cart.getAddCart);

router.get('/remove/:id',verifyToken,Cart.remove);

module.exports = router;