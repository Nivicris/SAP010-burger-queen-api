const express = require('express');

const router = express.Router();
const authController = require('../controller/auth');

router.post('/auth', authController.postAuth);

module.exports = router;
