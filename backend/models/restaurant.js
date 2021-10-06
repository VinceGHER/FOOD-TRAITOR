const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Meal = require('./meal');

const restaurantSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    bannerUrl: { type: String, required: true },
    categories: [{
        name: {type: String, required: true }, 
        mealList: [{type: Schema.Types.ObjectId, ref: 'Meal'}],
    }],
    orders: [{type: Schema.Types.ObjectId, ref:'Order', required: true}],
});

module.exports = mongoose.model('Restaurant', restaurantSchema);