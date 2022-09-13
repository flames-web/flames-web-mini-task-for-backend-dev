const express = require('express');
const router = express.Router();
const passwordReset = require('../../controllers/passwordReset');
const {validateUser} = require('../../middleware')

router.post('/',validateUser,passwordReset.postReset);

router.post('/:id/:token',passwordReset.postOtp);

module.exports = router;