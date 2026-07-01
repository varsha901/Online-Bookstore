const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: 'General'
    },
    price: {
      type: Number,
      required: true
    },
    stock: {
      type: Number,
      default: 10
    },
    coverImage: {
      type: String,
      default: ''
    },
    rating: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Book', bookSchema);