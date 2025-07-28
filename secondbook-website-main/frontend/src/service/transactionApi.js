import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_URL = `${API_BASE}/api/transaction`;

export const createTransaction = async (transactionData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, transactionData, {
      withCredentials: true, // if you use auth cookies
    });
    return response.data;
  } catch (error) {
    console.error("Error creating transaction:", error.response?.data || error.message);
    throw error;
  }
};
