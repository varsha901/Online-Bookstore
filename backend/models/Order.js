const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        }
      }
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending'
    },
    orderStatus: {
      type: String,
      enum: ['created', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'created'
    },
    shippingAddress: {
      fullName: String,
      address: String,
      city: String,
      province: String,
      postalCode: String,
      country: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);