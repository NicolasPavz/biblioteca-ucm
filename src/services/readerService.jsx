import axios from "axios";

const API = import.meta.env.VITE_API_URL + "/reader";


// ADmin
export const changeReaderState = async (email, state) =>{
    try {
        const response = await axios.post(`${API}/state/${email}`, { state });
        return response.data;
    } catch (error) {
        console.error("Error cambiando el estado del lector", error);
        throw error;
    }
}

export const getReaderByEmail = async (email) => {
    try {
        const response = await axios.get(`${API}/find/${email}`);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo lector por email", error);
        throw error;
    }
}