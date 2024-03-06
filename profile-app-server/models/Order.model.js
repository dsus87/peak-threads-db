const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  shippingDetails: {
    name: String,
    address: String,
    city: String,
    state: String,
    zip: String,
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      enum: ['S', 'M', 'L'],
    }
  }],
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentDetails: {
    method: { type: String, required: true }, 
    status: { type: String, enum: ['Paid', 'Pending', 'Failed'], required: true },
    transactionId: { type: String, required: false },
  },
});

module.exports = model("Order", orderSchema);
