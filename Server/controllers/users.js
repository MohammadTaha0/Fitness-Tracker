
const User = require('../models/user');
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(200).json({ status: 443, msg: 'Email Already Exist!' });
        }
        await User.create({ name, email, password });
        res.status(200).json({
            status: 200,
            msg: "Created Successfully!",
        });
    } catch (error) {
        console.log(error)
        res.status(200).json({ status: 500, msg: "Internal Server Error!!" });

    }
}
const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email == "" || password == "") {
        return res.status(200).json({
            status: 443,
            msg: "Both Fields Required!",
        })
    }
    User.findOne({ email: email }).then(user => {
        if (!user) {
            return res.status(200).json({
                status: 443,
                msg: "User not Exist!",
            })
        }

        bcryptjs.compare(password, user.password, (err, data) => {
            if (err) {
                return res.status(200).json({
                    status: 500,
                    msg: "Something Went Wrong",
                })
            }
            if (data) {
                const token = jwt.sign({ email: user.email }, process.env.SECRET_TOKEN);
                return res.status(200).json({
                    status: 200,
                    msg: "Login Success!",
                    token: token
                })
            } else {
                return res.status(200).json({
                    status: 443,
                    msg: "Invalid Credentials!",
                })
            }

        });
    });

}
const change_name = async (req, res) => {
    return res.status(200).json({status: 200, body: req.body});
}
module.exports = { register, login, change_name };