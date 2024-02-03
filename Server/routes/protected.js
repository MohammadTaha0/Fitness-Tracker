const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

// router.route("/change-name").post(usersController.chnage_name);
router.route("/change-name").post(usersController.change_name);


module.exports = router;