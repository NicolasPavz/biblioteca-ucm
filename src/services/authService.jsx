import axios from "axios";

const API = import.meta.env.VITE_API_URL + "/auth";

export const login = async (credentials) => {
  return await axios.post(`${API}/login`, credentials);
};

export const register = async (userData) => {
  return await axios.post(`${API}/register`, userData);
};