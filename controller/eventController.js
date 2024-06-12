const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Event } = require('../model/dbdetails');
const cloudinary = require('../model/Cloudinary');

// Multer configuration
const storage = multer.diskStorage({
    destination: './public/images',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
});

// Function to add an event
const addEvent = async (req, res) => {
    try {
        const { userId, eventName, eventDate, eventTime, eventLocation, eventMusicians,eventAttendees } = req.body;
        // console.log("Request body:", req.body);

        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "ems/eventimage"
        });

        // console.log("Cloudinary upload result:", result);

        const publicId = result.public_id;
        fs.unlinkSync(req.file.path); // Remove the file from the local storage

        // Create a new event instance
        const newEvent = new Event({
            userId,
            EventName: eventName,
            EventTime: eventTime,
            EventDate: eventDate,
            EventLocation: eventLocation,
            EventMusicaians: eventMusicians,
            EventImage: result.url,
            EventPublicId: publicId,
            EventAttendees:eventAttendees,
        });

        // Save the new event to the database
        await newEvent.save();
        console.log("Event added successfully:", newEvent);
        res.json({
            msg: "Event Added Successfully",
            event: newEvent
        });
    } catch (err) {
        console.error("Error adding event:", err);
        res.status(500).json({ err: "Internal Server Error" });
    }
};

const allevents = async(req,res) =>{
    try{
        const {userId} = req.params;

        if(userId){
            console.log('userevent')
            const result= await Event.find({userId:userId})
            res.json({msg:"Event Fetched ",events:result})
        }
        const result = await Event.find();
        res.json({msg:"Events Fetched",events:result})
    }catch(err){
        console.log(err);
        res.json("Internal Error")
    }
}

const getevent = async (req,res)=>{
    try{
        const {eventId}=req.params;
        // console.log(eventId)
        const result = await Event.findOne({_id:eventId})
        if(!result){
            console.log("Event not found")
            return res.json({msg:"Event not found"})
        }
        return res.json({
            msg:"Event Details Fetched",
            eventdet:result,
        })
    }catch(err){
        console.log(err);
        res.json("Internal Server Errror")
    }
}

const bookEvent = async(req,res) =>{
    try{
    const {eventId}= req.params;
        // console.log("eventId",eventId)
    const result = await Event.findOne({_id:eventId})
    if(!result ){
        res.json("Event Not found")
    }
    return res.json({msg:"Event Details Fetched",event:result})
    }  catch(err){
        console.log(err)
        res.json({msg:"Internal Error"})
    }

}

// Export the necessary modules
module.exports = { addEvent, upload , allevents,getevent,bookEvent };
