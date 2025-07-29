// src/pages/SellerProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/SellerProfile.css";
import { getSellerById } from "../service/sellerApi";

const SellerProfile = () => {
  const { id } = useParams();
  const [seller, setSeller] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const data = await getSellerById(id);
        setSeller(data.seller);
        setBooks(data.books || []);
      } catch (error) {
        console.error("Error fetching seller:", error);
      }
    };

    fetchSeller();
  }, [id]);

  if (!seller) return <p>Loading seller profile...</p>;

  return (
    <div className="seller-profile-container">
      <div className="seller-info">
        <h2>{seller.full_name || seller.username}</h2>
        <p><strong>Email:</strong> {seller.email}</p>
        <p><strong>Phone:</strong> {seller.phone_number || "N/A"}</p>
        <p><strong>Address:</strong> {seller.address || "N/A"}</p>
        {seller.profile_photo && (
          <img
            src={seller.profile_photo}
            alt="Seller"
            className="seller-profile-photo"
          />
        )}
      </div>

      <div className="seller-books">
        <h3>Books Sold by {seller.full_name || seller.username}</h3>
        {books.length === 0 ? (
          <p>No books found.</p>
        ) : (
          <div className="book-list">
            {books.map((book) => (
              <div key={book.book_id} className="book-card">
                <img
                  src={book.BookImages?.[0]?.image_url || "/placeholder.png"}
                  alt={book.title}
                  className="book-card-img"
                />
                <div className="book-card-info">
                  <h4>{book.title}</h4>
                  <p>{book.author}</p>
                  <p>${book.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerProfile;
