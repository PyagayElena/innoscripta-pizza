const mongoose = require('mongoose');

// schema maps to a collection
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: 'String',
        required: true,
        trim: true
    },
    type: {
        type: 'String',
        required: true,
        trim: true
    },
    image: {
        type: 'String',
        required: true,
        trim: true
    },
    ingredients: {
        type: 'String',
        required: true,
        trim: true
    },
    price: {
        type: 'Number',
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Product', productSchema);
