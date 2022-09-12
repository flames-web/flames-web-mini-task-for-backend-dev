const express = require('express');
const router = express.Router();
const order = require('../../controllers/order');

// router.get('/order/:id',)

router.post('/order',order.postOrder);

router.get('/order/:id',order.getOrder);

router.get('/order',order.orders);

module.exports = router;