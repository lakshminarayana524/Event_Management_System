require('dotenv').config();
const mongoose = require('mongoose')

const ConnectDB = async () =>{
    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB is Connected")
    } catch(err){
        console.log("Failed to Connect",err)
    }
}

module.exports= ConnectDB;