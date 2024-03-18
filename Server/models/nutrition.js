const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const nutritionSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, "Usermust be provided "]
    },
    mealType: {
        type: String,
        required: [true, "meal type must be provided"],
    },
    foodItem: {
        type: String,
        required: [true, "food item must be provided"],
    },
    quantity: {
        type: Number,
        required: [true, "quantity must be provided"],
    },
    nutritionDetail: {
        type: String,
        required: [true, "nutrition detail must be provided"],
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



const Nutrition = mongoose.model("Nutrition", nutritionSchema);

module.exports = Nutrition;