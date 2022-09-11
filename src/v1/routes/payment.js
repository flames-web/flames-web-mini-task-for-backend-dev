const express = require('express');
const router = express.Router();
const payment = require('../../controllers/payment');
const {verifyToken} = require('../../middleware');

router.post('/initialize',verifyToken,payment.payment);

router.get('/verify/:ref',verifyToken,payment.verifyPayment);

router.get('/transactions',verifyToken,payment.allTransactions)

module.exports = router;