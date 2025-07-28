import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_URL = `${API_BASE}/api/cart`;

export const fetchCartItems = async (user_id) =>
{
    const response = await axios.get(`${API_URL}/${user_id}`);
    return response.data;
}

export const removeFromCart = async (cart_item_id) => {
  const response = await axios.delete(`${API_URL}/${cart_item_id}`);
  return response.data;
};

export const clearCart = async (user_id) => {
  const response = await axios.delete(`${API_URL}/clear/${user_id}`);
  return response.data;
};
