import React, { useState } from "react";
import axios from "axios";
import { BOOK_GENRES } from "../utils/genreList";
import "../styles/SellNow.css";

const SellNow = () => {
  const [formData, setFormData] = useState({
    bookTitle: "",
    genre: "fiction", // Default to first genre
    price: "",
    phone: "",
    description: "",
    bookImage: null,
    sellerName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, bookImage: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData || !userData.token) {
        alert('Please log in to sell a book');
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('bookTitle', formData.bookTitle);
      formDataToSend.append('genre', formData.genre);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('sellerName', formData.sellerName);
      
      if (formData.bookImage) {
        formDataToSend.append('bookImage', formData.bookImage);
      }

      const response = await axios.post(
        'http://localhost:5000/api/books/sell',
        formDataToSend,
        {
          headers: {
            'Authorization': `Bearer ${userData.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        alert('Book added successfully!');
        
        // Clear form fields
        setFormData({
          bookTitle: "",
          genre: "fiction",
          price: "",
          phone: "",
          description: "",
          bookImage: null,
          sellerName: "",
        });
        
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
          fileInput.value = '';
        }
      }
    } catch (error) {
      console.error('Error selling book:', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('Failed to add book. Please try again.');
      }
    }
  };

  return (
    <div className="sell-now-container">
      <h2>Sell Your Book</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Book Title:
          <input
            type="text"
            name="bookTitle"
            placeholder="Enter book title"
            value={formData.bookTitle}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Genre:
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          >
            {BOOK_GENRES.map((genre) => (
              <option key={genre.value} value={genre.value}>
                {genre.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Price:
          <input
            type="text"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Seller Name:
          <input
            type="text"
            name="sellerName"
            placeholder="Enter seller name"
            value={formData.sellerName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            placeholder="Enter book description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </label>
        <label>
          Book Image:
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        {formData.bookImage && (
          <img 
            src={URL.createObjectURL(formData.bookImage)} 
            alt="Book Preview" 
            className="book-preview" 
          />
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SellNow;