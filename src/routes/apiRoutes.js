const express = require('express');
const router = express.Router();

// Import the middleware
const { protect, authorize } = require('../../middleware/authMiddleware');

// Import the Controllers
const {
  getAllDishes,
  createDish,
  getDishById,
  updateDish,
  deleteDish,
} = require('../controllers/dishController');

const {
  getAllChefs,
  createChef,
  getChefById,
  updateChef,
  deleteChef,
} = require('../controllers/chefController'); 

// ========== DISH ROUTES ==========

// Public routes - anyone can access (no token needed)
router.get('/dishes', getAllDishes);
router.get('/dishes/:id', getDishById);

// Protected routes - require authentication and proper roles
router.post('/dishes', protect, authorize('admin', 'manager'), createDish);
router.put('/dishes/:id', protect, authorize('admin', 'manager'), updateDish);
router.delete('/dishes/:id', protect, authorize('admin'), deleteDish);

// ========== CHEF ROUTES ==========

// Public routes - anyone can view chefs
router.get('/chefs', getAllChefs);
router.get('/chefs/:id', getChefById);

// Protected routes - only admins can modify chef data
router.post('/chefs', protect, authorize('admin'), createChef);
router.put('/chefs/:id', protect, authorize('admin'), updateChef);
router.delete('/chefs/:id', protect, authorize('admin'), deleteChef);

module.exports = router;