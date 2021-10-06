const mongoose = require('mongoose');
const orderSchema = require('./order');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


const userClientSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
});
userClientSchema.plugin(uniqueValidator);


module.exports = mongoose.model('UserClient', userClientSchema);
