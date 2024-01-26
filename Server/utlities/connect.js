const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;
const connectDB = () => {
    console.log("Connect Database");
    return mongoose.connect(URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    });
};

module.exports = connectDB;