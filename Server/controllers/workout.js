
const User = require('../models/user');
const Workout = require('../models/workout');
const jwt = require("jsonwebtoken");

const add_workout = async (req, res) => {
    // return  "let me see, what i can do for you, i don't want to commi anything now!";
    let user = await User.findById(req.user.id);
    // return res.status(200).json(req.user.id);
    if (req.body.name == "" || req.body.sets == "" || req.body.reps == "" || req.body.weight == "") {
        return res.status(200).json({ status: 443, msg: "Please Fill Atleast One FIeld" });
    }
    const { name, sets, reps, weight, note } = req.body;
    await Workout.create({
        user: req.user.id,
        name: name,
        sets: sets, reps: reps,
        weight: weight,
        note: note,
        created_at: new Date(),
        updated_at: new Date(),
    });
    return res.status(200).json({ status: 200, msg: "Saved" });
};
const get_workout = async (req, res) => {
    let workouts = await Workout.find({ user: req.user.id }).sort({ 'created_at': 'desc' });
    // if (!user) {
    //     return res.status(200).json({ status: 443, msg: "User Doesn't Exist!" });
    // }
    return res.status(200).json({ status: 200, data: workouts });
}


module.exports = { add_workout, get_workout };