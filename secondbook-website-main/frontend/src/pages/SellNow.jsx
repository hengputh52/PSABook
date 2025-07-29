import React, { useState } from "react";
import axios from "axios";
import { BOOK_GENRES } from "../utils/genreList";
import "../styles/SellNow.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const SellNow = () => {
  const [formData, setFormData] = useState({
    bookTitle: "",
    genre: "fiction", // Default to first genre
    price: "",
    phone: "",
    description: "",
    sellerName: "",
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Check authentication status on component mount
  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/users/me`, {
          withCredentials: true,
        });
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
        console.log('User not authenticated');
      }
    };
    checkAuth();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 5) {
      alert("You can upload maximum 5 images");
      return;
    }

    setSelectedImages(files);

    // Create preview URLs
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setImagePreviewUrls(previewUrls);
  };

  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviewUrls = imagePreviewUrls.filter((_, i) => i !== index);
    
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(imagePreviewUrls[index]);
    
    setSelectedImages(newImages);
    setImagePreviewUrls(newPreviewUrls);

    // Update file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput && newImages.length === 0) {
      fileInput.value = '';
    }
  };

  const uploadImages = async () => {
    if (selectedImages.length === 0) return [];

    setIsUploading(true);
    try {
      const formData = new FormData();
      selectedImages.forEach(file => {
        formData.append('images', file);
      });

      const response = await axios.post(
        `${API_BASE}/api/books/upload-images`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data.images;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw new Error('Failed to upload images');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert('Please log in to sell a book');
      return;
    }

    if (selectedImages.length === 0) {
      alert('Please select at least one image for your book');
      return;
    }

    try {
      setIsUploading(true);

      // First upload images to get URLs
      const imageUrls = await uploadImages();

      // Create book data object matching your backend model
      const bookData = {
        title: formData.bookTitle,
        genre: formData.genre,
        price: parseFloat(formData.price),
        contact_info: formData.phone,
        description: formData.description,
        author: formData.sellerName, // Using sellerName as author
        images: imageUrls, // Include uploaded image URLs
      };

      const response = await axios.post(
        `${API_BASE}/api/books`,
        bookData,
        {
          withCredentials: true, // Use cookies for authentication
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      alert('Book added successfully!');
      
      // Clear form fields
      setFormData({
        bookTitle: "",
        genre: "fiction",
        price: "",
        phone: "",
        description: "",
        sellerName: "",
      });

      // Clear images
      imagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
      setSelectedImages([]);
      setImagePreviewUrls([]);
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = '';
      }

      // Optionally redirect to Books You Sell page
      // if (window.confirm('Book added successfully! Would you like to view your books?')) {
      //   window.location.href = '/psabook/books-you-sell';
      // }

    } catch (error) {
      console.error('Error selling book:', error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('Failed to add book. Please try again.');
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="sell-now-container">
      <h2>Sell Your Book</h2>
      {!isLoggedIn && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          ⚠️ You need to be logged in to sell a book. Please log in first.
        </div>
      )}
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
          Book Images (Maximum 5 images):
          <input 
            type="file" 
            accept="image/*" 
            multiple 
            onChange={handleFileChange}
            disabled={isUploading}
          />
          <small style={{ color: '#666', fontSize: '0.9rem' }}>
            Select multiple images to showcase your book from different angles
          </small>
        </label>

        {/* Image Preview Section */}
        {imagePreviewUrls.length > 0 && (
          <div className="image-preview-container">
            <h4>Selected Images ({imagePreviewUrls.length}/5):</h4>
            <div className="image-preview-grid">
              {imagePreviewUrls.map((url, index) => (
                <div key={index} className="image-preview-item">
                  <img 
                    src={url} 
                    alt={`Book Preview ${index + 1}`} 
                    className="book-preview" 
                  />
                  <button 
                    type="button" 
                    className="remove-image-btn"
                    onClick={() => removeImage(index)}
                    disabled={isUploading}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button type="submit" disabled={!isLoggedIn || isUploading || selectedImages.length === 0}>
          {isUploading ? 'Uploading Images...' : 
           !isLoggedIn ? 'Please Log In First' : 
           selectedImages.length === 0 ? 'Please Select Images' :
           'Sell Now'}
        </button>
      </form>
    </div>
  );
};

export default SellNow;