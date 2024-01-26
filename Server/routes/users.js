const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

router.route("/register").post(usersController.register);
// router.route("/testing").get(getAllProductsTesting);

module.exports = router;