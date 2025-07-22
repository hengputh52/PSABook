import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InputInformation.css";

const InputInformation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profilePicture: "",
    quote: "", // Add quote field
    address: "", // Add address field
    favoriteBook: "", // Add favorite book field
    favoriteGenre: "", // Add favorite genre field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, profilePicture: reader.result }); // Save base64 image
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userProfile", JSON.stringify(formData)); // Save user data to localStorage
    navigate("/profile"); // Redirect to profile page
  };

  return (
    <div className="input-info-container">
      <h2>Input Your Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Profile Picture:
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        <label>
          Quote:
          <textarea
            name="quote"
            placeholder="Enter your favorite quote"
            value={formData.quote}
            onChange={handleChange}
            rows="3"
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <label>
          Favorite Book:
          <input
            type="text"
            name="favoriteBook"
            placeholder="Enter your favorite book"
            value={formData.favoriteBook}
            onChange={handleChange}
          />
        </label>
        <label>
          Favorite Genre:
          <select
            name="favoriteGenre"
            value={formData.favoriteGenre}
            onChange={handleChange}
          >
            <option value="">Select your favorite genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Mystery">Mystery</option>
            <option value="Biography">Biography</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InputInformation;
