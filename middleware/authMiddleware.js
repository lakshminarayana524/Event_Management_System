const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ msg: "No token found" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log("Wrong Token");
            res.clearCookie('token');
            return res.json({ msg: "Wrong Token" });
        }
        req.userId = decoded.userId;
        console.log("Token Verified");
        next();
    });
};

module.exports = {
    verifyToken
};
