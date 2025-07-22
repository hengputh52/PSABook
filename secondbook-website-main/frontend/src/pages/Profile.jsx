import React, { useState, useEffect } from "react";
import "../styles/Profile.css";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [cart, setCart] = useState([]);
  const [booksYouSell, setBooksYouSell] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userProfile")) || {};
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedBooksYouSell = JSON.parse(localStorage.getItem("booksYouSell")) || [];
    setUserInfo(storedUserInfo);
    setCart(storedCart);
    setBooksYouSell(storedBooksYouSell);
  }, []);

  useEffect(() => {
    if (isEditing) {
      setFormData({
        username: userInfo.username || "",
        email: userInfo.email || "",
        full_name: userInfo.full_name || "",
        address: userInfo.address || "",
        phone_number: userInfo.phone_number || "",
        date_of_birth: userInfo.date_of_birth || "",
        favorite_genre: userInfo.favorite_genre || "",
        favorite_book: userInfo.favorite_book || "",
      });
    }
  }, [isEditing, userInfo]);

  // Helper to compute avatar URL consistently
  const buildAvatar = () => {
    if (userInfo && userInfo.profile_photo) {
      let path = userInfo.profile_photo.replace(/\\/g, "/");
      // If it's a full URL (Cloudinary or remote), use as-is
      if (path.startsWith("http")) return path;
      // If it's a local upload, ensure correct path
      if (!path.startsWith("uploads/")) {
        path = `uploads/${path}`;
      }
      return `http://localhost:3000/${path}`;
    }
    return "https://via.placeholder.com/150";
  };

  const getApiUrl = () => {
    return import.meta.env.VITE_API_URL || "http://localhost:3000";
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Upload file to Cloudinary (unsigned) and then save user profile
  const uploadToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary env vars missing");
    }
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", uploadPreset);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: form,
    });
    if (!res.ok) throw new Error("Failed to upload image to Cloudinary");
    const data = await res.json();
    return data.secure_url;
  };

  const handleSaveProfile = async () => {
        // Build JSON payload. Upload image first if changed
    let payload = { ...formData };
    if (formData.profile_photo instanceof File) {
      const url = await uploadToCloudinary(formData.profile_photo);
      payload.profile_photo = url;
    }
    // Front-end required field validation (only username and email required for update)
    const required = ["username", "email"];
    for (const key of required) {
      if (!payload[key] || payload[key].toString().trim() === "") {
        alert(`${key.replace(/_/g, " ")} is required`);
        return;
      }
    }

    // remove file objects
    Object.keys(payload).forEach((k) => {
      if (payload[k] instanceof File) delete payload[k];
    });
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/api/users/${userInfo.user_id}`, {
        method: "PUT",
        credentials: "include", // send cookies if backend uses them
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const data = await res.json();
      setUserInfo(data.user);
      localStorage.setItem("userProfile", JSON.stringify(data.user));
      setIsEditing(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRemoveFromBooksYouSell = (id) => {
    const updatedBooks = booksYouSell.filter((book) => book.id !== id);
    setBooksYouSell(updatedBooks);
    localStorage.setItem("booksYouSell", JSON.stringify(updatedBooks));
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
      const apiUrl = getApiUrl();
      
      // Call backend logout endpoint
      await fetch(`${apiUrl}/api/users/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      // Clear all user data from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userProfile");
      localStorage.removeItem("cart");
      localStorage.removeItem("booksYouSell");

      // Reset component state
      setUserInfo({});
      setCart([]);
      setBooksYouSell([]);
      setIsEditing(false);
      setFormData({});
      setPhotoPreview(null);

      // Show success message and redirect
      alert("Logged out successfully!");
      
      // Redirect to home page (you can change this to your login page)
      window.location.href = "/";
      
    } catch (err) {
      console.error("Logout error:", err);
      // Even if backend call fails, clear local data
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userProfile");
      localStorage.removeItem("cart");
      localStorage.removeItem("booksYouSell");
      alert("Logged out successfully!");
      window.location.href = "/";
    }
  };

  return (
    <div className="profile-container">
      <h2 className="section-title">Profile</h2>
      <div className="profile-info">
        <div className="profile-buttons">
          <button className="edit-btn" onClick={() => setIsEditing((p) => !p)}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="profile-image">
          <img
            src={(() => {
              if (userInfo && userInfo.profile_photo) {
                let path = userInfo.profile_photo.replace(/\\/g, "/");
                if (!path.startsWith("http") && !path.startsWith("uploads/")) {
                  path = `uploads/${path}`;
                }
                return path.startsWith("http") ? path : `${getApiUrl()}/${path}`;
              }
              return "https://via.placeholder.com/150";
            })()}
            alt="Profile"
          />
        </div>
        <div className="profile-details">
          <p><strong>Name:</strong> {userInfo.username || "N/A"}</p>
          <p><strong>Email:</strong> {userInfo.email || "N/A"}</p>
          <p><strong>Date of Birth:</strong> {userInfo.dateOfBirth || "N/A"}</p>
          <p><strong>Address:</strong> {userInfo.address || "N/A"}</p>
          <p><strong>Favorite Book Genre:</strong> {userInfo.favoriteGenre || "N/A"}</p>
          <p><strong>Favorite Book:</strong> {userInfo.favorite_book || "N/A"}</p>
        </div>
      </div>


      {/* Edit Modal */}
      {isEditing && (
        <div className="edit-overlay" onClick={(e) => { if (e.target.classList.contains('edit-overlay')) setIsEditing(false) }}>
          <div className="edit-modal">
            <h2>Edit Profile</h2>
            <div className="modal-body">
              <div className="modal-image-section">
                <img src={photoPreview || buildAvatar()} alt="Preview" className="modal-avatar" />
                <label className="modal-change-btn">
                  Change Photo
                  <input type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setPhotoPreview(URL.createObjectURL(file));
                      setFormData(prev => ({ ...prev, profile_photo: file }));
                    }
                  }} />
                </label>
              </div>
              <div className="modal-form-section">
                <label>Username
                  <input name="username" value={formData.username} onChange={handleInputChange} readOnly />
                </label>
                <label>Email
                  <input name="email" value={formData.email} onChange={handleInputChange} readOnly />
                </label>
                <label>Full Name
                  <input name="full_name" value={formData.full_name} onChange={handleInputChange} />
                </label>
                <label>Address
                  <input name="address" value={formData.address} onChange={handleInputChange} />
                </label>
                <label>Phone Number
                  <input name="phone_number" value={formData.phone_number} onChange={handleInputChange} />
                </label>
                <label>Date of Birth
                  <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleInputChange} />
                </label>
                <label>Favorite Genre
                  <input name="favorite_genre" value={formData.favorite_genre} onChange={handleInputChange} />
                </label>
                <label>Favorite Book
                  <input name="favorite_book" value={formData.favorite_book} onChange={handleInputChange} />
                </label>
              </div>
            </div>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSaveProfile}>Save Changes</button>
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Quote Section */}
      <div className="quote-section">
        <p className="quote">
          "A reader lives a thousand lives before he dies. The man who never reads lives only one." – George R.R. Martin
        </p>
      </div>

      <h2 className="section-title">Your Cart</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author || "N/A"}</td>
                  <td>{book.genre || "N/A"}</td>
                  <td>{book.description || "N/A"}</td>
                  <td>{book.price}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveFromCart(book.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Your cart is empty.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h2 className="section-title">Books You Sell</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Price</th>
              <th>Phone</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {booksYouSell.length > 0 ? (
              booksYouSell.map((book) => (
                <tr key={book.id}>
                  <td>{book.bookTitle}</td>
                  <td>{book.genre}</td>
                  <td>{book.price}</td>
                  <td>{book.phone}</td>
                  <td>{book.description}</td>
                  <td>
                    <button onClick={() => handleRemoveFromBooksYouSell(book.id)}>Remove</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No books added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
