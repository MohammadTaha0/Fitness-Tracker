
const User = require('../models/user');
const bcryptjs = require("bcryptjs");
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
    User.findOne({email}).then(user=>{
        if(!user){
            return res.status(200).json({
                status: 443,
                msg: "User not Exist!",
            })
        }

        bcryptjs.compare(password, user.password, (err, data) => {
            if(err){
                return res.status(200).json({
                    status: 443,
                    msg: "Both Fields Required!",
                })
            }
        });
    });
}
module.exports = { register };