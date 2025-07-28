import { CartItem, BookImage, Book } from "../models/index.js";

// Add a book to cart
// Add a book to cart
export const addToCart = async (req, res) => {
  try {
    const { user_id, book_id } = req.body;

    // Check if already in cart
    const existingItem = await CartItem.findOne({
      where: { user_id, book_id },
    });

    if (existingItem) {
      return res.status(409).json({ message: "Book already in cart" });
    }

    const cartItem = await CartItem.create({ user_id, book_id });
    res.status(201).json(cartItem);
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get all cart items for a user
export const getCartItems = async (req, res) => {
  try {
    const { user_id } = req.params;
    const items = await CartItem.findAll({
       where: { user_id },
       include: [
        { 
          model: Book, include: [
            {model: BookImage , attributes: ["image_url"], limit: 1}
          ]
          
    }]
      
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove a book from cart
export const removeFromCart = async (req, res) => {
  try {
    const { cart_item_id } = req.params;
    const item = await CartItem.findByPk(cart_item_id);
    if (!item) return res.status(404).json({ error: "Cart item not found" });
    await item.destroy();
    res.json({ message: "Cart item removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const clearCartByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    await CartItem.destroy({ where: { user_id } });
    res.json({ message: "All cart items removed." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

