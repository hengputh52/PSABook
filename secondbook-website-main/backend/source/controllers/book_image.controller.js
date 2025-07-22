import { BookImage } from "../models/index.js";

// Add a new image to a book
export const addBookImage = async (req, res) => {
  try {
    const { book_id, image_url } = req.body;
    const image = await BookImage.create({ book_id, image_url });
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all images for a book
export const getBookImages = async (req, res) => {
  try {
    const { book_id } = req.params;
    const images = await BookImage.findAll({ where: { book_id } });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an image by image_id
export const deleteBookImage = async (req, res) => {
  try {
    const { image_id } = req.params;
    const image = await BookImage.findByPk(image_id);
    if (!image) return res.status(404).json({ error: "Image not found" });
    await image.destroy();
    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};