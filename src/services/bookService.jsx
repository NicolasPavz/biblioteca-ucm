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

export const searchBookByTitle = async (title) => {
  try {
    const response = await axios.get(`${API}/find/${title}`);
    return response.data;
  } catch (error) {
    console.error("Error buscando libro por título", error);
    throw error;
  }
}
export const searchBookByType = async (type) => {
  try {
    const response = await axios.get(`${API}/all/${type}`);
    return response.data;
  }catch (error) {
    console.error("Error buscando libro por tipo", error);
    throw error;
  }
}

export const newBook = async (book) => {
  try {
    const response = await axios.post(`${API}/new`, book);
    return response.data;
  } catch (error) {
    console.error("Error creando nuevo libro", error);
    throw error;
  }
}
export const newCopy = async (copy) => {
  try {
    const response = await axios.post(`${API}/newcopy`, copy);
    return response.data;
  } catch (error) {
    console.error("Error creando nueva copia del libro", error);
    throw error;
  }
}
export const getCopyByTitle = async (title) => {
  try {
    const response = await axios.get(`${API}/copy/${title}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo copias del libro por título", error);
    throw error;
  }
}