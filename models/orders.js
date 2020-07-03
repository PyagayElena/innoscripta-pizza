const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user_id: {
        type: 'String',
        required: true,
        trim: true
    },
    products: {
        type: 'String',
        required: false,
        trim: true,
        default: ''
    },
    total: {
        type: 'Number',
        required: false,
        trim: true,
        default: 0
    },
    date: {
        type: 'Date',
        required: false,
        trim: true,
        default: new Date()
    },
    currency: {
        type: 'String',
        required: false,
        trim: true,
        default: 'usd'
    }
});

module.exports = mongoose.model('Orders', orderSchema);
