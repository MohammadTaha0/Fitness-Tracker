
const User = require('../models/user');
const Nutrition = require('../models/nutrition');
const moment = require('moment');

const delete_ = async (req, res) => {
    let user = await User.findById(req.user.id);
    if (req.body.id == "") {
        return res.status(200).json({ status: 443, msg: "This Record Not Exist!" });
    }
    if (req.body.id) {
        const data = await Nutrition.findByIdAndDelete(req.body.id);
        return res.status(200).json({ status: 200, msg: "Deleted" });
    }
    return res.status(200).json({ status: 200, msg: "Something Went Wrong!" });
};
const add = async (req, res) => {
    let user = await User.findById(req.user.id);
    if (req.body.mealType == "" || req.body.foodItem == "" || req.body.quantity == "" || req.body.nutritionDetail == "") {
        return res.status(200).json({ status: 443, msg: "Please Fill Atleast One FIeld" });
    }
    const { nutritionDetail, mealType, foodItem, quantity } = req.body;
    if (req.body.id) {
        const data = await Nutrition.findByIdAndUpdate(req.body.id, {
            user: req.user.id,
            nutritionDetail: nutritionDetail,
            mealType: mealType,
            foodItem: foodItem,
            quantity: quantity,
            updated_at: new Date(),
        });
        return res.status(200).json({ status: 200, msg: "Updated" });
    }
    await Nutrition.create({
        user: req.user.id,
        nutritionDetail: nutritionDetail,
        mealType: mealType,
        foodItem: foodItem,
        quantity: quantity,
        created_at: new Date(),
        updated_at: new Date(),
    });
    return res.status(200).json({ status: 200, msg: "Saved" });
};
const get = async (req, res) => {
    let nutritions = await Nutrition.find({ user: req.user.id }).sort({ 'created_at': 'desc' });
   
    return res.status(200).json({ status: 200, data: nutritions });
}
async function getByNutritionDetail(req, res) {
    const { nutritionDetail } = req.params; 

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const firstDayOfMonth = moment({ year, month: month - 1 }).startOf('month');
    const lastDayOfMonth = moment({ year, month: month - 1 }).endOf('month');

    const nutritions = await Nutrition.find({
        user: req.user.id,
        nutritionDetail: nutritionDetail,
        created_at: {
            $gte: firstDayOfMonth,
            $lte: lastDayOfMonth,
        },
    }).sort({ 'created_at': 'asc' });

    const nutritionByDay = {};

    for (let day = 1; day <= lastDayOfMonth.date(); day++) {
        const formattedDate = moment({ year, month: month - 1, day }).format('Do');
        nutritionByDay[formattedDate] = {
            quantity: 0,
            foodItem: 0
        };

    }
    nutritions.forEach(nutrition => {
        const formattedDate = moment(nutrition.created_at).format('Do');
        nutritionByDay[formattedDate].quantity += parseFloat(nutrition.quantity);
        nutritionByDay[formattedDate].foodItem += parseFloat(nutrition.foodItem);
    });
    

    return res.status(200).json({ status: 200, data: nutritionByDay });
}



module.exports = { add, get, delete_, getByNutritionDetail };