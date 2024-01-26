
const User = require('../models/user');
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({ msg: 'Email Already Exist!' });
        }
        await User.create({ name, email, password });
        res.status(200).json({
            msg: "Created Successfully!",
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: "Internal Server Error!!" });

    }
}
module.exports = { register };