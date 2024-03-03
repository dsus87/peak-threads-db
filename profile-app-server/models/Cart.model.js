const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Many-to-One relationship: Many orders can reference one User.
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
  }],
  // Many-to-Many relationship: An order can include many products.
  totalPrice: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ['In Cart', 'Paid'],
    default: 'In Cart',
    required: true,
  },
});

const Cart = mongoose.model('Cart', orderSchema);