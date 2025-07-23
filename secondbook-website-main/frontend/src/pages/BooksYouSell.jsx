import React, { useState, useEffect } from "react";
import "../styles/BooksYouSell.css";

const BooksYouSell = () => {
  const [booksYouSell, setBooksYouSell] = useState([]);

  useEffect(() => {
    // Fetch books you sell from localStorage
    const storedBooksYouSell = JSON.parse(localStorage.getItem("booksYouSell")) || [];
    setBooksYouSell(storedBooksYouSell);
  }, []);

  const handleRemoveFromBooksYouSell = (id) => {
    if (window.confirm("Are you sure you want to remove this book from your selling list?")) {
      const updatedBooks = booksYouSell.filter((book) => book.id !== id);
      setBooksYouSell(updatedBooks);
      localStorage.setItem("booksYouSell", JSON.stringify(updatedBooks));
    }
  };

  const handleEditBook = (id) => {
    // TODO: Implement edit functionality
    alert("Edit functionality will be implemented soon!");
  };

  const getStatusBadge = (status = "available") => {
    const statusColors = {
      available: "#27ae60",
      sold: "#e74c3c",
      pending: "#f39c12"
    };
    
    return (
      <span 
        className="status-badge"
        style={{ backgroundColor: statusColors[status] || statusColors.available }}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="books-you-sell-container">
      <div className="books-header">
        <h2 className="section-title">Books You Sell</h2>
        <a href="/sell" className="add-book-btn">
          + Add New Book
        </a>
      </div>

      {booksYouSell.length > 0 ? (
        <div className="table-container">
          <table className="books-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Price</th>
                <th>Phone</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {booksYouSell.map((book) => (
                <tr key={book.id}>
                  <td>
                    <img 
                      src={book.image || book.bookImage || "https://via.placeholder.com/60x80?text=No+Image"} 
                      alt={book.bookTitle || book.title}
                      className="book-image"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/60x80?text=No+Image";
                      }}
                    />
                  </td>
                  <td className="book-title">{book.bookTitle || book.title}</td>
                  <td>
                    <span className="genre-badge">{book.genre}</span>
                  </td>
                  <td className="book-price">${book.price}</td>
                  <td className="phone-number">{book.phone}</td>
                  <td className="book-description">
                    <div className="description-content">
                      {book.description}
                    </div>
                  </td>
                  <td>{getStatusBadge(book.status)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEditBook(book.id)}
                        title="Edit book"
                      >
                        ✏️
                      </button>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveFromBooksYouSell(book.id)}
                        title="Remove book"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-books">
          <div className="empty-books-content">
            <div className="empty-icon">📚</div>
            <h3>No books listed yet</h3>
            <p>Start selling your books by adding them to your inventory!</p>
            <a href="/sell" className="start-selling-btn">
              Start Selling Books
            </a>
          </div>
        </div>
      )}

      {booksYouSell.length > 0 && (
        <div className="books-summary">
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-number">{booksYouSell.length}</span>
              <span className="stat-label">Total Books</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {booksYouSell.filter(book => book.status !== 'sold').length}
              </span>
              <span className="stat-label">Available</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {booksYouSell.filter(book => book.status === 'sold').length}
              </span>
              <span className="stat-label">Sold</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksYouSell;
