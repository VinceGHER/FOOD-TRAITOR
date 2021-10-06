const mongoose = require('mongoose');

const mealSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  expiration: {Date},
});

module.exports = mongoose.model('Meal', mealSchema);
