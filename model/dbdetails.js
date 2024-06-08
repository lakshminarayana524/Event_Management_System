const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    date:({type:Date,default:Date}),
    profile:{
        imageurl:String,
        publicId:String
    }
})

const User  = mongoose.model("Users",UserSchema);

const EventSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    EventName: { type: String, required: true },
    EventTime: { type: String, required: true },
    EventDate: { type: String, required: true },
    EventLocation: { type: String, required: true },
    EventMusicaians: { type: String, required: true },
    EventAttendees: { type: String, required: true },
    EventImage: { type: String, required: true },
    EventPublicId: { type: String },
    date: { type: Date, default: Date.now },
});

const Event = mongoose.model("Events", EventSchema);

module.exports={User,Event};