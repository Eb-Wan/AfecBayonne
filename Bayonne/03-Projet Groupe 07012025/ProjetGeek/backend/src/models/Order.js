const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ad', required: true }}
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["pending", "done"], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
