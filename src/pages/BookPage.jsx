import { useState } from "react";
import { newBook } from "../services/bookService";
import HeaderAdmin from "../components/HeaderAdmin";
import "../styles/BookPage.css";

const BookPage = () => {
    const [form, setForm] = useState({
        author: "",
        title: "",
        type: "",
        image64: "",
    });
    const [mensaje, setMensaje] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(",")[1];
            setForm({ ...form, image64: base64String });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await newBook(form);
            alert("Libro creado exitosamente");
            setForm({ author: "", title: "", type: "", image64: "" });
        } catch (error) {
            console.error("Error al crear libro:", error);
            setMensaje("Error al crear libro");
        }
    };

    return (
        <div className="home-page">
            <HeaderAdmin />
            <main className="home-content">
                <h2>Nuevo Libro</h2>
                <form onSubmit={handleSubmit} className="form-libro">
                    <input
                        type="text"
                        name="title"
                        placeholder="Título"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="author"
                        placeholder="Autor"
                        value={form.author}
                        onChange={handleChange}
                        required
                    />
                    <select name="type" value={form.type} onChange={handleChange} required>
                        <option value="">Seleccionar tipo</option>
                        <option value="NOVELA">NOVELA</option>
                        <option value="TEXTO">TEXTO</option>
                        <option value="REVISTA">REVISTA</option>
                    </select>
                    <input type="file" accept="image/*" onChange={handleImage} />
                    <button type="submit">Crear libro</button>
                </form>
                {mensaje && <p>{mensaje}</p>}
            </main>
        </div>
    );
};

export default BookPage;