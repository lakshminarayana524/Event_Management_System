const express = require('express');
const { verifyUser } = require('../controller/verifyController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', verifyToken, verifyUser);

module.exports = router;
