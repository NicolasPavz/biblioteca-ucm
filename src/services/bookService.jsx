import axios from "axios";
import axiosInstance from "./axiosConfig";

const API = import.meta.env.VITE_API_URL + "/book";

//Public
export const getAllBooks = async () => {
  try {
    const response = await axios.get(`${API}/all`);
    return response.data;
  } catch (error) {
    console.error("Error mostrando todos los libros", error);
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

//ADMIN

export const searchBookByTitle = async (title) => {
  try {
    const response = await axiosInstance.get(`${API}/find/${title}`);
    return response.data;
  } catch (error) {
    console.error("Error buscando libro por título", error);
    throw error;
  }
}

export const newBook = async (book) => {
  try {
    const response = await axiosInstance.post(`${API}/new`, book);
    return response.data;
  } catch (error) {
    console.error("Error creando nuevo libro", error);
    throw error;
  }
}
export const newCopy = async (bookFk) => {
  try {
    const response = await axiosInstance.post(`${API}/newcopy`, {bookFk});
    return response.data;
  } catch (error) {
    console.error("Error creando nueva copia del libro", error);
    throw error;
  }
}
export const getCopyByTitle = async (title) => {
  try {
    const response = await axiosInstance.get(`${API}/copy/${title}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo copias del libro por título", error);
    throw error;
  }
}