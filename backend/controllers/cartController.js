const Cart = require('../models/Cart');
const Book = require('../models/Book');

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.book');

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch cart', error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { bookId, quantity = 1 } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(
      item => item.book.toString() === bookId
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({ book: bookId, quantity });
    }

    await cart.save();

    cart = await Cart.findOne({ user: req.user._id }).populate('items.book');

    res.status(200).json({ success: true, message: 'Book added to cart', data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add to cart', error: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { bookId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const item = cart.items.find(
      item => item.book.toString() === bookId
    );

    if (!item) {
      return res.status(404).json({ success: false, message: 'Book not found in cart' });
    }

    item.quantity = Number(quantity);
    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user._id }).populate('items.book');

    res.status(200).json({ success: true, message: 'Cart updated', data: updatedCart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update cart', error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { bookId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      item => item.book.toString() !== bookId
    );

    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user._id }).populate('items.book');

    res.status(200).json({ success: true, message: 'Book removed from cart', data: updatedCart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to remove from cart', error: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ success: true, message: 'Cart cleared', data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to clear cart', error: error.message });
  }
};