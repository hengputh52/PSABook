import axios from "axios"
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_URL = `${API_BASE}/api/books`;

// Fetch recent book 
// export const fetchBooks = async () => {
//   const res = await fetch(API_URL);
//   if (!res.ok) throw new Error("Failed to fetch books");
//   return res.json();
// };



// Fetch recent books with optional limit, offset, and genre
export const fetchRecentBooks = async ({ limit = 8, offset = 0, genre = "" } = {}) => {
  const url = new URL(`${API_URL}/recent`);
  url.searchParams.append("limit", limit);
  url.searchParams.append("offset", offset);
  if (genre) {
    url.searchParams.append("genre", genre);
  }

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch recent books");
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

export const fetchFilteredBooks = async (genre, price) => {
  const params = new URLSearchParams();
  if (genre && genre !== "All") params.append("genre", genre);
  if (price && price !== "All") params.append("price", price);

  const response = await fetch(`${API_URL}/filter?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch filtered books");
  return response.json();
};


