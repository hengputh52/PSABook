
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

export const getSellerById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/api/seller/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch seller info");
  }
};
