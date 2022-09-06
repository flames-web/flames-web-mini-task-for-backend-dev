const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth');
const {verifyToken,validateUser} = require('../../middleware');

router.post('/register',validateUser,authController.register);

router.get('/m',verifyToken,authController.registeredUser);

router.post('/login',authController.login);

router.post('/verifyToken',authController.verifyOtp);

router.get('/logout', authController.logout);

module.exports = router;