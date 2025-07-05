import axiosInstance from "./axiosConfig";

const API = import.meta.env.VITE_API_URL + "/fine";

export const getFinesByEmail = async (email) => {
  try {
    const response = await axiosInstance.get(`${API}/find/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo multas por email", error);
    throw error;
  }
}

export const newFine = async (fine) => {
  try {
    const response = await axiosInstance.post(`${API}/new`, fine);
    return response.data;
  } catch (error) {
    console.error("Error creando multa", error);
    throw error;
  }
}