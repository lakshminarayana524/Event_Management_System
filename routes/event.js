const express = require('express');
const router = express.Router();
const { addEvent, upload ,allevents,getevent,bookEvent} = require('../controller/eventController');

// Apply the multer middleware to the route
router.post('/add', upload.single('image'), addEvent);
router.get('/allevents',allevents);
router.get('/allevent/:userId',allevents);
router.get('/eventdet/:eventId', getevent);
router.get('/event/:eventId',bookEvent)

module.exports = router;
