const verifyUser = (req, res) => {
    if (req.userId) {
        return res.json({ msg: "Successfully Verified", userId: req.userId });
    } else {
        return res.json({ msg: "No token found" });
    }
};

module.exports = {
    verifyUser
};
