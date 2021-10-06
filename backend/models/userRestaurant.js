const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userRestaurantSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
userRestaurantSchema.plugin(uniqueValidator);

module.exports = mongoose.model('UserRestaurant', userRestaurantSchema);