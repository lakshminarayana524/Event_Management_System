const express = require('express');
const { getUser,UsersbyId } = require('../controller/userController');
const router = express.Router();

router.get('/', getUser);
router.get('/userprofile/:userId',UsersbyId)
router.get('/update')

module.exports = router;
