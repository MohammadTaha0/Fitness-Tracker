require("dotenv").config();
const express = require("express");
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

const connectDB = require("./utlities/connect");

const PORT = process.env.PORT || 5000;
const auth_routes = require("./routes/auth");
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hi, i am Live!");
});



// middleware or to set router
app.use("/api/auth", auth_routes);

app.use(verifyToken = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(200).json({
            status: 403,
            msg: "Access Denied"
        })
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(200).json({
                status: 401,
                msg: "UnAuthorized!",
            })
        }
        req.user = decoded;
        next();
    })
});

const protected_routes = require("./routes/protected");

app.use("/api", protected_routes);

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`${PORT} Yes I Am Connected`)
        })
    } catch (error) {
        console.log(error)
    }
}
start();