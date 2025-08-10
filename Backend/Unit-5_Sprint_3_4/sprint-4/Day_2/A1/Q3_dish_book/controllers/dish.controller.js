const DishModel = require("../models/dish.model");

exports.createDish = async (req, res) => {
  try {
    const dish = await DishModel.create(req.body)
    return res.status(201).json(dish)
  } catch (err) {
    return res.status(500).json({ msg: "Failed to create dish", error: err.message })
  }
};

exports.getDishes = async (req, res) => {
  try {
    const dishes = await DishModel.find()
    return res.status(200).json(dishes)
  } catch (err) {
    return res.status(500).json({ msg: "Failed to fetch dishes", error: err.message })
  }
};

exports.updateDish = async (req, res) => {
  try {
    const dish = await DishModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!dish) return res.status(404).json({ msg: "Dish not found" })
    return res.status(200).json(dish);
  } catch (err) {
    return res.status(500).json({ msg: "Failed to update dish", error: err.message })
  }
};

exports.deleteDish = async (req, res) => {
  try {
    const dish = await DishModel.findByIdAndDelete(req.params.id)
    if (!dish) return res.status(404).json({ msg: "Dish not found" })
    return res.status(200).json({ msg: "Dish deleted" })
  } catch (err) {
    return res.status(500).json({ msg: "Failed to delete dish", error: err.message })
  }
};
