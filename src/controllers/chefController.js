// src/controllers/chefController.js
const Chef = require('../models/chefModel');

// ✅ GET ALL CHEFS
const getAllChefs = async (req, res) => {
  try {
    const chefs = await Chef.find();
    res.status(200).json(chefs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ CREATE A CHEF
const createChef = async (req, res) => {
  try {
    const chef = new Chef({
      name: req.body.name,
      specialty: req.body.specialty
    });
    await chef.save();
    res.status(201).json(chef);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ GET CHEF BY ID
const getChefById = async (req, res) => {
  try {
    const chef = await Chef.findById(req.params.id);
    if (!chef) {
      return res.status(404).json({ error: 'Chef not found' });
    }
    res.status(200).json(chef);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ UPDATE CHEF
const updateChef = async (req, res) => {
  try {
    const chef = await Chef.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!chef) {
      return res.status(404).json({ error: 'Chef not found' });
    }
    res.status(200).json(chef);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ DELETE CHEF
const deleteChef = async (req, res) => {
  try {
    const chef = await Chef.findByIdAndDelete(req.params.id);
    if (!chef) {
      return res.status(404).json({ error: 'Chef not found' });
    }
    res.status(200).json({ message: 'Chef deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllChefs,
  createChef,
  getChefById,
  updateChef,
  deleteChef
};