import axiosInstance from "./axiosConfig";

const API = import.meta.env.VITE_API_URL + "/booking";

export const getBookingsByEmail = async (email) => {
  try {
    const response = await axiosInstance.get(`${API}/find/${email}`);
    console.log("Reservas obtenidas:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo reservas por email", error);
    throw error;
  }
}

export const createBooking = async (booking) => {
  try {
    const response = await axiosInstance.post(`${API}/new`, booking);
    return response.data;
  } catch (error) {
    console.error("Error creando reserva", error);
    throw error;
  }
}