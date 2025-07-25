import axios from "axios"
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_URL = `${API_BASE}/api/books`;

// Fetch all books
export const fetchBooks = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
};

// Fetch a single book by ID
export const fetchBookById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch book");
  return res.json();
};

// Create a new book
export const createBook = async (bookData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Include cookies for authentication
    body: JSON.stringify(bookData),
  });
  if (!res.ok) throw new Error("Failed to create book");
  return res.json();
};

// Update a book
export const updateBook = async (id, bookData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookData),
  });
  if (!res.ok) throw new Error("Failed to update book");
  return res.json();
};

// Delete a book
export const deleteBook = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete book");
  return res.json();
};