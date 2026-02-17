const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0 // Price cannot be negative (validation)
    
  },
  category: {
    type: String,
    enum: ['Starters', 'Main', 'Dessert', 'Drinks'],
    required: true,
  },
  isVegetarian: {
    type: Boolean,
    default: false,
  },
  // Embedded Reviews
  reviews: [
  {
    user: String,
    rating: { type: Number, min: 1, max: 5 },
    comment: String
  }
],
  // Referenced Chef 
  chef: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Chef'
}
});

module.exports = mongoose.model('Dish', dishSchema);
