const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
    restaurantName: String,
    total: Number,
    comeToPick: String,
    clientId: {type: Schema.Types.ObjectId, ref:'UserClient', required: true},
    mealList: [{ type: Schema.Types.ObjectId, ref: 'Meal', required: true}]
},{
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);