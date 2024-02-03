const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name must be provided"],
    },
    email: {
        type: String,
        required: [true, "email must be provided"],
    },
    password: {
        type: String,
        required: [true, "password must be provided"],
    },

});

userShema.pre("save", async function (next) {
    try {

        const hashedPassword = await bcryptjs.hash(this.password, 10);

        this.password = hashedPassword;
        // this.salt = salt;
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("User", userShema);

module.exports = User;