const cloudinary  = require('../model/Cloudinary');
const {User} = require('../model/dbdetails')
const fs = require('fs')
const multer = require('multer');
const path = require('path');

const getUser = (req, res) => {
    res.json({ message: "Hello World" });
};

const UsersbyId = async (req,res) =>{
    try{
        const {userId} = req.params;

        if(!userId){
            return res.json("Please Login")
        }

        // console.log(userId)
        const result = await User.findOne({_id:userId});
        if(!result){
            res.json({msg:"No profile found"})
        }

        res.json({
            msg:"Profile data fetched",
            pro:result
        })
    }catch(err){
        console.log(err)
        res.json({msg:"Internal Server Error"})
    }
}

const storage = multer.diskStorage({
    destination: './public/images',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
});

const UpdateUser = async (req,res) =>{
    try{
        
        const {userId , name , password,image,phone}=req.body;
    if(!userId){
        return res.json("please login")
    }
        // console.log("user update",req);
        let profileUpdate = {};
        if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path,{
            folder:"ems/profile"
        });
        console.log("profile upload result:", result.secure_url);

        const profileId = result.public_id;
        fs.unlinkSync(req.file.path);

        profileUpdate={
                profile:{
                    imageurl:result.secure_url,
                    publicId:profileId
                }
            };
        }   

        const updatedUser = {
            ...(name && {name}),
            ...(password && {password}),
            ...(phone && {phone}),
            ...profileUpdate,
            'updatedBy.updated':new Date()
        };

        const UserUpdate = await User.findByIdAndUpdate(userId,updatedUser,{new:true});
        
        res.json({
            msg:"User Updated Successfull",
            user:UserUpdate
        })

    }catch(err){
        console.log(err);
        res.json({msg:"Server Error",error:err})
    }
}

module.exports = {
    getUser,UsersbyId,UpdateUser,upload
}; 
