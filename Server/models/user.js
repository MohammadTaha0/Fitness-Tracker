const mongoose = require("mongoose");

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
    // salt: {
    //     type: String,
    // }
});

// userShema.pre("save", async function (next) {
//     try {
//         const salt = await bcrypt.genSalt(10);

//         const hashedPassword = await bcrypt.hash(this.password, salt);

//         this.password = hashedPassword;
//         this.salt = salt;
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

const User = mongoose.model("User", userShema);

module.exports = User;