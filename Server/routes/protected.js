const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

// router.route("/change-name").post(usersController.chnage_name);
router.route("/update-profile").post(usersController.update_profile);
router.route("/get-user").get(usersController.get_user);


module.exports = router;