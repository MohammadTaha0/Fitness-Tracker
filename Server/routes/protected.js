const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const WorkoutController = require("../controllers/workout");

// router.route("/change-name").post(usersController.chnage_name);
router.route("/update-profile").post(usersController.update_profile);
router.route("/get-user").get(usersController.get_user);
router.route("/add-workout").post(WorkoutController.add_workout);
router.route("/delete-workout").post(WorkoutController.delete_workout);
router.route("/get-workout").get(WorkoutController.get_workout);
module.exports = router;