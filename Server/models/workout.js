const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const workoutSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, "Usermust be provided "]
    },
    name: {
        type: String,
        required: [true, "name must be provided"],
    },
    sets: {
        type: Number,
        required: [true, "sets must be provided"],
    },

    reps: {
        type: Number,
        required: [true, "reps must be provided"],
    },
    weight: {
        type: String,
        required: [true, "weight must be provided"],
    },
    note: {
        type: String,
        required: false,
    },
    created_at: {
        type: Date,
        required: [true, "Created at must be provided"]
    },
    updated_at: {
        type: Date,
        required: [true, "Updated at must be provided"]
    }
});



const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;