
const User = require('../models/user');
const Nutrition = require('../models/nutrition');
const jwt = require("jsonwebtoken");

const add_nutrition = async (req, res) => {
    // return  "let me see, what i can do for you, i don't want to commi anything now!";
    let user = await User.findById(req.user.id);
    // return res.status(200).json(req.user.id);
    if (req.body.mealType == "" || req.body.nutritionDetail == "" || req.body.foodItem == "" || req.body.quantity == "") {
        return res.status(200).json({ status: 443, msg: "Please Fill Atleast One FIeld" });
    }
    const { mealType, nutritionDetail, foodItem, quantity } = req.body;
    await Nutrition.create({
        user: req.user.id,
        mealType: mealType,
        nutritionDetail: nutritionDetail,
        foodItem: foodItem,
        quantity: quantity,
        created_at: new Date(),
        updated_at: new Date(),
    });
    return res.status(200).json({ status: 200, msg: "Saved" });
};
const get_nutrition = async (req, res) => {
    let nutritions = await Nutrition.find({ user: req.user.id }).sort({ 'created_at': 'desc' });
    return res.status(200).json({ status: 200, data: nutritions });
}


module.exports = { add_nutrition, get_nutrition };