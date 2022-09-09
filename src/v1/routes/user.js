const express  = require('express');
const router = express.Router();
const User = require('../../controllers/user');
const {verifyToken} = require('../../middleware');

router.get('/',User.getAllUers);

router.get('/:id',User.getUser)

module.exports = router;