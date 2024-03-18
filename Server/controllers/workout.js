
const User = require('../models/user');
const Workout = require('../models/workout');
const moment = require('moment');

const delete_workout = async (req, res) => {
    let user = await User.findById(req.user.id);
    if (req.body.id == "") {
        return res.status(200).json({ status: 443, msg: "This Record Not Exist!" });
    }
    if (req.body.id) {
        const data = await Workout.findByIdAndDelete(req.body.id);
        return res.status(200).json({ status: 200, msg: "Deleted" });
    }

    return res.status(200).json({ status: 200, msg: "Something Went Wrong!" });
};
const add_workout = async (req, res) => {
    // return  "let me see, what i can do for you, i don't want to commi anything now!";
    let user = await User.findById(req.user.id);
    // return res.status(200).json(req.user.id);
    if (req.body.name == "" || req.body.sets == "" || req.body.reps == "" || req.body.weight == "") {
        return res.status(200).json({ status: 443, msg: "Please Fill Atleast One FIeld" });
    }
    const { name, sets, reps, weight, note } = req.body;
    if (req.body.id) {
        const data = await Workout.findByIdAndUpdate(req.body.id, {
            user: req.user.id,
            name: name,
            sets: sets, reps: reps,
            weight: weight,
            note: note,
            updated_at: new Date(),
        });
        // return req.body.id;
        return res.status(200).json({ status: 200, msg: "Updated" });
    }
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
async function fetchWorkoutByName(req, res) {
    const { name } = req.params; // Accessing parameters passed in the URL

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const firstDayOfMonth = moment({ year, month: month - 1 }).startOf('month');
    const lastDayOfMonth = moment({ year, month: month - 1 }).endOf('month');

    const workouts = await Workout.find({
        user: req.user.id,
        name: name,
        created_at: {
            $gte: firstDayOfMonth,
            $lte: lastDayOfMonth,
        },
    }).sort({ 'created_at': 'asc' });

    const workoutsByDay = {};
    const workoutCountByDay = {}; 

    for (let day = 1; day <= lastDayOfMonth.date(); day++) {
        const formattedDate = moment({ year, month: month - 1, day }).format('Do');
        workoutsByDay[formattedDate] = {
            totalSets: 0,
            totalReps: 0,
            totalWeight: 0
        };
        workoutCountByDay[formattedDate] = 0;

    }
    workouts.forEach(workout => {
        const formattedDate = moment(workout.created_at).format('Do');
        workoutsByDay[formattedDate].totalSets += parseInt(workout.sets);
        workoutsByDay[formattedDate].totalReps += parseInt(workout.reps);
        workoutsByDay[formattedDate].totalWeight += parseFloat(workout.weight);
        workoutCountByDay[formattedDate]++;
    });
    for (const formattedDate in workoutsByDay) {
        const workoutCount = workoutCountByDay[formattedDate];
        if (workoutCount > 0) {
            workoutsByDay[formattedDate].averageWeight = workoutsByDay[formattedDate].totalWeight / workoutCount;
        } else {
            workoutsByDay[formattedDate].averageWeight = 0;
        }
    }

    return res.status(200).json({ status: 200, data: workoutsByDay });
}



module.exports = { add_workout, get_workout, delete_workout, fetchWorkoutByName };