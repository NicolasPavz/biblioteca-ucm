import axios from "axios";

const API = import.meta.env.VITE_API_URL + "/book";

export const getAllBooks = async () => {
  try {
    const response = await axios.get(`${API}/all`);
    return response.data;
  } catch (error) {
    console.error("Error mostrando todos los libros", error);
    throw error;
  }
}