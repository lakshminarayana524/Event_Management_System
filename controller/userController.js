const {User} = require('../model/dbdetails')

const getUser = (req, res) => {
    res.json({ message: "Hello World" });
};

const UsersbyId = async (req,res) =>{
    try{
        const {userId} = req.params;
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

module.exports = {
    getUser,UsersbyId
}; 
