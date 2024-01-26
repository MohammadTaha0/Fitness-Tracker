require("dotenv").config();
const express = require("express");
const cors = require('cors');

const app = express();

const connectDB = require("./utlities/connect");

const PORT = process.env.PORT || 5000;
const products_routes = require("./routes/users");
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hi, i am Live!");
});


// middleware or to set router
app.use("/api", products_routes);


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