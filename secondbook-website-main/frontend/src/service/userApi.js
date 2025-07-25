// frontend/service/userApi.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_URL = `${API_BASE}/api/users`;

// Axios config to send cookies
const config = { withCredentials: true };

// Register new user

export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/signup`, userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  return res.data;
};

export const loginUser = async (loginData) => {
  const res = await axios.post(`${API_URL}/login`, loginData, {
    withCredentials: true,
  });
  return res.data;
};



// Get current logged-in user profile using JWT cookie
export const fetchCurrentUser = async () => {
  const res = await axios.get(`${API_URL}/me`, config);
  return res.data;
};

// Get user profile by ID
export const fetchUserProfile = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`, config);
  return res.data;
};

// Update user profile
export const updateUserProfile = async (id, profileData) => {
  const res = await axios.put(`${API_URL}/${id}`, profileData, config);
  return res.data;
};

// Delete user
export const deleteUser = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, config);
  return res.data;
};
