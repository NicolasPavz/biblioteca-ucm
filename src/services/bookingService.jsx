import axiosInstance from "./axiosConfig";

const API = import.meta.env.VITE_API_URL + "/booking";

export const getBookingsByEmail = async (email) => {
  try {
    const response = await axiosInstance.get(`${API}/find/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo reservas por email", error);
    throw error;
  }
}