// frontend/src/service/fakeData.js
// Utility to fetch or generate fake data for demo purposes.
// The backend provides an endpoint /api/fake that returns fake users and books.

import axios from "axios";

const API_URL = "http://localhost:3000/api/fake";

export const fetchFakeData = async (params = {}) => {
  // params can include ?users=20&books=50 overrides
  const res = await axios.get(API_URL, { params });
  return res.data; // { users: [...], books: [...] }
};
