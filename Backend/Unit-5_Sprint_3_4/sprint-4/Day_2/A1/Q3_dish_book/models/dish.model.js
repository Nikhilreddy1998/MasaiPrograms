const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const DishModel = mongoose.model("Dish", dishSchema);

module.exports = DishModel
