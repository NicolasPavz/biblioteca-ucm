import { useState } from "react";
import { newBook, newCopy, searchBookByTitle } from "../services/bookService";
import HeaderAdmin from "../components/HeaderAdmin";
import BookForm from "../components/BookFormComponent";
import BookCopyForm from "../components/BookCopyFormComponent";
import "../styles/BookPage.css";

const BookPage = () => {
    const [form, setForm] = useState({
        author: "",
        title: "",
        type: "",
        image64: "",
    });
    const [, setMensaje] = useState("");
    const [results, setResults] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [searchTitle, setSearchTitle] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearchBook = async () => {
        try {
            setLoading(true);
            const data = await searchBookByTitle(searchTitle.trim());
            setResults(Array.isArray(data) ? data : [data]);
        } catch (error) {
            console.error("Error al buscar libros:", error);
            alert("Error al buscar libros");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCopy = async () => {
        if (!selectedBook) return;
        try {
            setLoading(true);
            await newCopy(selectedBook.id);
            alert("Copia creada exitosamente");
            setResults([]);
            setSearchTitle("");
            setSelectedBook(null);
        } catch (error) {
            console.error("Error al crear copia:", error);
            alert("Error al crear copia");
        } finally {
            setLoading(false);
        }
    };

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
            setLoading(true);
            await newBook(form);
            alert("Libro creado exitosamente");
            setForm({ author: "", title: "", type: "", image64: "" });
        } catch (error) {
            console.error("Error al crear libro:", error);
            setMensaje("Error al crear libro");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="book-page">
            <HeaderAdmin />
            <main className="book-content">
                <div className="book-header">
                    <h1 className="book-title">Gestión de Libros</h1>
                    <p className="book-subtitle">Crear nuevos libros y copias adicionales</p>
                </div>

                <div className="book-sections">
                    <div className="book-section">
                        <h2 className="section-title">Nuevo Libro</h2>
                        <BookForm
                            form={form}
                            loading={loading}
                            onSubmit={handleSubmit}
                            onChange={handleChange}
                            onImageChange={handleImage}
                        />
                    </div>

                    <div className="section-divider"></div>

                    <div className="book-section">
                        <h2 className="section-title">Crear Copia de Libro Existente</h2>
                        <BookCopyForm
                            searchTitle={searchTitle}
                            setSearchTitle={setSearchTitle}
                            results={results}
                            selectedBook={selectedBook}
                            setSelectedBook={setSelectedBook}
                            loading={loading}
                            onSearch={handleSearchBook}
                            onCreateCopy={handleCreateCopy}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BookPage;