const express = require('express');
const Chef = require('./models/chefModel');
const router = express.Router();

router.post('/', async (req, res) => {
  const chef = new Chef(req.body);
  await chef.save();
  res.status(201).send(chef);
});