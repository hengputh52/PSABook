import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/BooksYouSell.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const BooksYouSell = () => {
  const [booksYouSell, setBooksYouSell] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchBooksYouSell();
  }, []);

  const fetchBooksYouSell = async () => {
    try {
      setLoading(true);
      
      // Check if user is authenticated
      const authResponse = await axios.get(`${API_BASE}/api/users/me`, {
        withCredentials: true,
      });
      setIsLoggedIn(true);
      
      // Fetch user's books
      const response = await axios.get(`${API_BASE}/api/books/my-books`, {
        withCredentials: true,
      });
      
      console.log('📚 Books data received:', response.data);
      setBooksYouSell(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setIsLoggedIn(false);
      setBooksYouSell([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromBooksYouSell = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`${API_BASE}/api/books/${bookId}`, {
          withCredentials: true,
        });
        
        // Refresh the list
        fetchBooksYouSell();
        alert("Book deleted successfully!");
      } catch (error) {
        console.error('Error deleting book:', error);
        alert("Failed to delete book. Please try again.");
      }
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
        className="books-you-sell-status-badge"
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
        <a href="/psabook/sell" className="add-book-btn">
          + Add New Book
        </a>
      </div>

      {!isLoggedIn && (
        <div className="login-message">
          <p>Please log in to view your books.</p>
        </div>
      )}

      {loading && isLoggedIn && (
        <div className="loading-message">
          <p>Loading your books...</p>
        </div>
      )}

      {isLoggedIn && !loading && booksYouSell.length === 0 && (
        <div className="empty-state">
          <h3>No books listed yet</h3>
          <p>You haven't listed any books for sale yet.</p>
          <a href="/psabook/sell" className="sell-first-book-btn">
            Sell Your First Book
          </a>
        </div>
      )}

      {isLoggedIn && !loading && booksYouSell.length > 0 && (
        <div className="books-grid">
          {booksYouSell.map((book) => {
            console.log('📖 Rendering book:', book);
            return (
            <div key={book.book_id} className="books-you-sell-card">
              <Link to={`/book/${book.book_id}`} className="books-you-sell-link">
                <div className="books-you-sell-image-section">
                  {book.BookImages && book.BookImages.length > 0 ? (
                    <div className="book-image-carousel">
                      <img 
                        src={book.BookImages[0]?.image_url || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=="} 
                        alt={book.title}
                        className="books-you-sell-cover"
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==";
                        }}
                      />
                      {book.BookImages.length > 1 && (
                        <div className="image-count-badge">
                          📷 {book.BookImages.length}
                        </div>
                      )}
                    </div>
                  ) : (
                    <img 
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==" 
                      alt="No Image"
                      className="books-you-sell-cover"
                    />
                  )}
                  <div className="books-you-sell-status-overlay">
                    {getStatusBadge(book.status)}
                  </div>
                </div>
              </Link>
              
              <div className="books-you-sell-info-section">
                <div className="books-you-sell-header">
                  <h3 className="books-you-sell-title">{book.title || 'No Title'}</h3>
                  <div className="books-you-sell-price">${book.price || '0.00'}</div>
                </div>
                
                <div className="books-you-sell-details">
                  <div className="books-you-sell-detail-row">
                    <span className="books-you-sell-detail-label">Author:</span>
                    <span className="books-you-sell-detail-value">{book.author || 'Unknown'}</span>
                  </div>
                  
                  <div className="books-you-sell-detail-row">
                    <span className="books-you-sell-detail-label">Genre:</span>
                    <span className="books-you-sell-genre-badge">{book.genre || 'Unknown'}</span>
                  </div>
                  
                  <div className="books-you-sell-detail-row">
                    <span className="books-you-sell-detail-label">Contact:</span>
                    <span className="books-you-sell-detail-value">{book.contact_info || 'No contact'}</span>
                  </div>
                  
                  <div className="books-you-sell-detail-row">
                    <span className="books-you-sell-detail-label">Listed:</span>
                    <span className="books-you-sell-detail-value">
                      {new Date(book.listed_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="books-you-sell-description-section">
                    <span className="books-you-sell-detail-label">Description:</span>
                    <p className="books-you-sell-description">{book.description}</p>
                  </div>
                </div>
                
                <div className="books-you-sell-actions">
                  <button
                    className="books-you-sell-edit-btn"
                    onClick={() => handleEditBook(book.book_id)}
                    title="Edit book"
                  >
                    <span>✏️</span>
                    Edit
                  </button>
                  <button
                    className="books-you-sell-delete-btn"
                    onClick={() => handleRemoveFromBooksYouSell(book.book_id)}
                    title="Delete book"
                  >
                    <span>🗑️</span>
                    Delete
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      )}

      {isLoggedIn && !loading && booksYouSell.length > 0 && (
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
