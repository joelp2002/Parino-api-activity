const express = require('express');
const router = express.Router();
let data = require('../models/dishmodel');

// 1) GET (Read All) + optional filters: category, price, name, isVegetarian
router.get('/dishes', (req, res) => {
  const { category, price, name, isVegetarian } = req.query;

  let filtered = data
    .filter(d => !category || d.category.toLowerCase() === String(category).toLowerCase())
    .filter(d => price === undefined || d.price <= parseFloat(price))
    .filter(d => !name || d.name.toLowerCase().includes(String(name).toLowerCase()))
    .filter(d => isVegetarian === undefined || String(d.isVegetarian) === String(isVegetarian));

  if (filtered.length === 0) {
    return res.status(404).json({
      status: 404,
      message: 'No dishes found matching the criteria',
      data: []
    });
  }

  return res.status(200).json({
    status: 200,
    message: 'Retrieved dishes successfully',
    data: filtered
  });
});

// GET (Read One)
router.get('/dishes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({
      status: 400,
      message: 'Bad Request: id must be a number',
      data: []
    });
  }

  const item = data.find(d => d.id === id);

  if (!item) {
    return res.status(404).json({
      status: 404,
      message: `Dish with ID ${id} not found`,
      data: []
    });
  }

  return res.status(200).json({
    status: 200,
    message: 'Retrieved dish successfully',
    data: item
  });
});

// 2) POST (Create)
router.post('/dishes', (req, res) => {
  const { name, price, category, isVegetarian } = req.body || {};

  if (!name || price === undefined || !category || isVegetarian === undefined) {
    return res.status(400).json({
      status: 400,
      message: 'Bad Request: name, price, category, and isVegetarian are required',
      data: []
    });
  }

  const newItem = {
    id: data.length ? data[data.length - 1].id + 1 : 1,
    name,
    price,
    category,
    isVegetarian
  };

  data.push(newItem);

  return res.status(201).json({
    status: 201,
    message: 'Dish created successfully',
    data: newItem
  });
});

// 3) PUT (Update)
router.put('/dishes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = data.findIndex(d => d.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: 404,
      message: `Dish with ID ${id} not found`,
      data: []
    });
  }

  // full update (replace)
  data[index] = { id, ...req.body };

  return res.status(200).json({
    status: 200,
    message: 'Dish updated successfully',
    data: data[index]
  });
});

// 4) DELETE (Remove)
router.delete('/dishes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = data.findIndex(d => d.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: 404,
      message: `Dish with ID ${id} not found`,
      data: []
    });
  }

  data.splice(index, 1);

  return res.status(204).json({
    message: 'Dish deleted successfully'
  });
});

module.exports = router;
