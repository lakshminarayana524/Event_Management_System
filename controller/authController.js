const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../model/dbdetails');

const generateUniqueIdentifier = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const signup = (req, res) => {
    const { name, email, password } = req.body;
    const lowercaseEmail = email.toLowerCase();
    User.findOne({ email: lowercaseEmail })
        .then(exist => {
            if (exist) {
                return res.json({ msg: "Email already exists" });
            } else {
                bcrypt.hash(password, 10)
                    .then(hash => {
                        User.create({ name, email: lowercaseEmail, password: hash })
                            .then(() => {
                                res.json({ msg: "Created Successfully" });
                                console.log("Successfully Created User");
                            })
                            .catch((err) => {
                                res.json({ message: err.message });
                                console.log(err.message);
                            });
                    });
            }
        })
        .catch(err => {
            res.json({ msg: err.message });
            console.log(err.message);
        });
};

const login = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        const uniqueIdentifier = generateUniqueIdentifier();
                        const token = jwt.sign({ userId: user._id, username: user.username, uniqueIdentifier }, process.env.SECRET_KEY, { expiresIn: '1h' });
                        console.log("Login Successfull")
                        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None' })
                            .json({ msg: "Login Successful", token, userId: user._id });
                    } else {
                        res.json({ msg: "Wrong Password" });
                    }
                });
            } else {
                res.json({ msg: "User not found" });
                console.log("User not found");
            }
        });
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
};

module.exports = {
    signup,
    login,
    logout
};
