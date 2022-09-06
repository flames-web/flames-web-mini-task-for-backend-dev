const express = require('express');
const router = express.Router();
const passwordReset = require('../../controllers/passwordReset');
const {validateUser} = require('../../middleware')

router.post('/',passwordReset.postReset);

router.post('/:id/:token',validateUser,passwordReset.postToken);

module.exports = router;