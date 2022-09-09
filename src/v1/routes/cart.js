const express = require('express');
const router = express.Router();
const Cart = require('../../controllers/cart')
const {verifyToken} = require('../../middleware')

router.get('/',verifyToken,Cart.carts);

router.get('/add/:id',verifyToken, Cart.getAddCart);

router.get('/remove/:id',verifyToken,Cart.remove);

router.get('/removeAll',verifyToken,Cart.removeAllCarts);

module.exports = router;