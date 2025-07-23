import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/BookList.css";
import outsider from "../assets/outsider cover.jpg";
import meet14 from "../assets/meet14year cover.jpg";
import theboys from "../assets/theboys cover.jpg";
import allthelight from "../assets/all the light we cannot see cover.jpg";
import gameofthrone from "../assets/gameofthrone cover.jpg";
import harry from "../assets/harry.jpg";

export const books = [
  {
    id: 1,
    title: "Educated",
    price: "2$",
    image: "https://i.ebayimg.com/00/s/MTYwMFgxMjAw/z/JAwAAOSwAK1hb6PV/$_57.JPG?set_id=8800005007",
    description: "A memoir by Tara Westover.",
    author: "Tara Westover",
    seller: "John Doe",
    telephone: "123-456-7890",
    address: "123 Memoir St, New York, NY"
  },
  {
    id: 2,
    title: "Harry Potter",
    price: "2$",
    image: outsider,
    description: "A fantasy novel by J.K. Rowling.",
    author: "J.K. Rowling",
    seller: "Jane Smith",
    telephone: "987-654-3210",
    address: "456 Fantasy Ln, London, UK"
  },
  {
    id: 3,
    title: "The Book of Art",
    price: "2$",
    image: meet14,
    description: "A guide to art and creativity.",
    author: "Robert Greene",
    seller: "Art Books Co.",
    telephone: "555-123-4567",
    address: "789 Art Blvd, Paris, France"
  },
  {
    id: 4,
    title: "Don't Look Back",
    price: "2$",
    image: theboys,
    description: "A thrilling mystery novel.",
    author: "Lee Child",
    seller: "Thriller Books Ltd.",
    telephone: "444-987-6543",
    address: "321 Mystery Rd, Los Angeles, CA"
  },
  {
    id: 5,
    title: "All the Light We Cannot See",
    price: "2$",
    image: allthelight,
    description: "A historical fiction novel by Anthony Doerr.",
    author: "Anthony Doerr",
    seller: "Historical Reads",
    telephone: "222-333-4444",
    address: "555 History Blvd, Berlin, Germany"
  },
  {
    id: 6,
    title: "Game of Thrones",
    price: "2$",
    image: gameofthrone,
    description: "A fantasy epic by George R.R. Martin.",
    author: "George R.R. Martin",
    seller: "Fantasy World",
    telephone: "666-777-8888",
    address: "101 Fantasy St, Dublin, Ireland"
  },
  {
    id: 7,
    title: "Meet 14-Year-Old Me",
    price: "2$",
    image: meet14,
    description: "A book about a 14-year-old.",
    author: "Unknown",
    seller: "Teen Reads",
    telephone: "111-222-3333",
    address: "404 Teen St, Chicago, IL"
  },
  {
    id: 8,
    title: "Meet 14-Year-Old Me",
    price: "2$",
    image: harry,
    description: "A book about a 14-year-old.",
    author: "Unknown",
    seller: "Teen Reads",
    telephone: "111-222-3333",
    address: "404 Teen St, Chicago, IL"
  }
];

const BookList = () => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleAddToCart = (book) => {
    if (!cart.some((item) => item.id === book.id)) {
      const updatedCart = [...cart, book];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          {/* Add a default genre (e.g., "general") to the URL */}
          <Link to={`/book/general/${book.id}`}>
            <img src={book.image} alt={book.title} />
            <h4>{book.title}</h4>
            <p>{book.price}</p>
          </Link>
          <button
            onClick={() => handleAddToCart(book)}
            disabled={cart.some((item) => item.id === book.id)}
          >
            {cart.some((item) => item.id === book.id) ? "Already Added" : "Add to Cart"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookList;
