const express = require('express');
const router = express.Router();
const { addEvent, upload ,allevents,getevent} = require('../controller/eventController');

// Apply the multer middleware to the route
router.post('/add', upload.single('image'), addEvent);
router.get('/allevents',allevents);
router.get('/eventdet/:userId', getevent);

module.exports = router;
