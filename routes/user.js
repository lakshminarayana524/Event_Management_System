const express = require('express');
const { getUser,upload,UsersbyId,UpdateUser } = require('../controller/userController');
const router = express.Router();

router.get('/', getUser);
router.get('/user/:userId',UsersbyId)
router.put('/update/:userId',upload.single('image'),UpdateUser)

module.exports = router;
