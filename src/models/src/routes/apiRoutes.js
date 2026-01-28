const express = require('express');
const router = express.Router();
let data = require('../models/dishModel'); // mock data array

// 1) GET (Read All) with optional filters
router.get('/dishes', (req, res) => {
  const { category, price, name, isVegetarian } = req.query;

  let filtered = data
    .filter(d => !category || d.category.toLowerCase() === category.toLowerCase())
    .filter(d => !price || d.price <= parseFloat(price))
    .filter(d => !name || d.name.toLowerCase().includes(name.toLowerCase()))
    .filter(d => isVegetarian === undefined || String(d.isVegetarian) === isVegetarian);

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

// 2) POST (Create)
router.post('/dishes', (req, res) => {
  const { name, price, category, isVegetarian } = req.body || {};

  if (!name || price === undefined || !category || isVegetarian === undefined) {
    return res.status(400).json({
      status: 400,
      message: 'Bad Request: Name, Price, Category, and isVegetarian are required',
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

// 3) PUT (Update Full Resource)
router.put('/dishes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex(d => d.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: 404,
      message: `Dish with ID ${id} not found`,
      data: []
    });
  }

  data[index] = { id, ...req.body };

  return res.status(200).json({
    status: 200,
    message: 'Dish updated successfully',
    data: data[index]
  });
});

// 4) DELETE (Remove)
router.delete('/dishes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex(d => d.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: 404,
      message: `Dish with ID ${id} not found`,
      data: []
    });
  }

  data.splice(index, 1);

  return res.status(203).json({
    status: 203,
    message: 'Dish deleted successfully',
    data: []
  });
});

module.exports = router;
