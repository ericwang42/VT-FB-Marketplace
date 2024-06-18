const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    status: String,
    condition: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    coverImage: String,
    category: String
});

module.exports = mongoose.model('Product', productSchema);