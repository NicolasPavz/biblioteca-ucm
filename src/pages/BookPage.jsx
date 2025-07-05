import { useState } from "react";
import { newBook, newCopy, searchBookByTitle } from "../services/bookService";
import HeaderAdmin from "../components/HeaderAdmin";
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

    const handleSearchBook = async () => {
        try {
            const data = await searchBookByTitle(searchTitle.trim());
            setResults(Array.isArray(data) ? data : [data]);
        } catch (error) {
            console.error("Error al buscar libros:", error);
            alert("Error al buscar libros");
        }
    };
    const handleCreateCopy = async () => {
        if (!selectedBook) return;
        try {
            await newCopy(selectedBook.id);
            alert("Copia creada exitosamente");
            setResults([]);
            setSearchTitle("");
            setSelectedBook(null);
        } catch (error) {
            console.error("Error al crear copia:", error);
            alert("Error al crear copia");
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
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar tipo</option>
            <option value="NOVELA">NOVELA</option>
            <option value="TEXTO">TEXTO</option>
            <option value="REVISTA">REVISTA</option>
          </select>
          <input type="file" accept="image/*" onChange={handleImage} />
          <button type="submit">Crear libro</button>
        </form>

        <hr style={{ margin: "2rem 0" }} />
        <h2>Crear Copia de Libro Existente</h2>

        <div className="form-libro">
          <input
            type="text"
            placeholder="Buscar libro por título..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <button onClick={handleSearchBook}>Buscar libro</button>

          {results.length > 0 && (
            <div className="search-results">
              <p>Resultados:</p>
              <ul>
                {results.map((book) => (
                  <li
                    key={book.id}
                    className={selectedBook?.id === book.id ? "selected" : ""}
                    onClick={() => setSelectedBook(book)}
                  >
                    <strong>{book.title}</strong> — {book.author} ({book.type})
                  </li>
                ))}
              </ul>
              <button onClick={handleCreateCopy} disabled={!selectedBook}>
                Crear copia del libro seleccionado
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BookPage;