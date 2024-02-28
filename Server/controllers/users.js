
const User = require('../models/user');
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require('multer');

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
                const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN);
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
const get_user = async (req, res) => {
    let user = await User.findById(req.user.id).select("-password");
    if (!user) {
        return res.status(200).json({ status: 443, msg: "User Doesn't Exist!" });
    }
    return res.status(200).json({ status: 200, data: user });
}
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for uploaded files

const update_profile = async (req, res) => {
    let user = await User.findById(req.user.id);
    if (req.body.name == "" && req.body.email == "" && req.body.password == "") {
        return res.status(200).json({ status: 443, msg: "Please Fill Atleast One FIeld" });
    }
    upload.single('profile_image')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ status: 500, msg: 'Multer error' });
        } else if (err) {
            return res.status(500).json({ status: 500, msg: 'An unknown error occurred' });
        }
        console.log(req.file);
        if (req.file) {
            user.profile_image = req.file.path;
        }
        if (req.body.name) {
            user.name = req.body.name;
        }
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.password) {
            user.password = req.body.password;
        }
        await user.save();
        return res.status(200).json({ status: 200, msg: "Updated" });
    });

};
const update_profile_ = async (req, res) => {
    let user = await User.findById(req.user.id);

    // Multer middleware to handle the file upload
    upload.single('profile_image')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ status: 500, msg: 'Multer error' });
        } else if (err) {
            return res.status(500).json({ status: 500, msg: 'An unknown error occurred' });
        }

        // Check if a file was uploaded
        if (req.file) {
            user.profile_image = req.file.path; // Assuming you store the file path in the user profile
        }

        // Your existing code for updating other fields
        if (req.body.name) {
            user.name = req.body.name;
        }
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.password) {
            user.password = req.body.password;
        }

        await user.save();
        return res.status(200).json({ status: 200, msg: 'Updated' });
    });
};

module.exports = { register, login, update_profile, get_user };