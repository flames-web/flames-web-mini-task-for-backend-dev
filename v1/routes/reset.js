const express = require('express');
const router = express.Router();
const passwordReset = require('../../controllers/passwordReset');

router.post('/',passwordReset.postReset);

router.post('/:id/:token',passwordReset.postToken);

module.exports = router;