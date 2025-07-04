import { useEffect, useState } from "react";
import { getAllBooks, searchBookByType} from "../services/bookService";
import HeaderLector from "../components/HeaderLector";
import "./HomePage.css";

const LectorHomePage = () => {
  const [books, setBooks] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getAllBooks();
        setBooks(response);
      } catch (error) {
        console.error("Error al obtener los libros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);


  const handleTypeSearch = async () => {
    if (!type.trim()) return;
    try {
      const result = await searchBookByType(type.trim());
      setBooks(result);
    } catch (error) {
      console.error("Error al buscar por tipo:", error);
      setBooks([]);
    }
  };

  const handleClear = async () => {
    setType("");
    const response = await getAllBooks();
    setBooks(response);
  };

  return (
    <div className="home-page">
      <HeaderLector />
      <main className="home-content">
        <h1>Bienvenido a la Biblioteca UCM</h1>
        <div className="search-section">
          <input
            type="text"
            placeholder="Buscar libros por tipo..."
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="search-bar"
            onKeyDown={(e) => e.key === "Enter" && handleTypeSearch()}  
          />
          <button onClick={handleTypeSearch} className="search-button">
            Buscar por tipo
          </button>
          <button onClick={handleClear} className="clear-button">
            Limpiar
          </button>
        </div>

        {loading ? (
          <p className="loading-text">Cargando libros...</p>
        ) : (
          <div className="book-list">
            {Array.isArray(books) && books.length > 0 ? (
              books.map((book) => (
                <div key={book.id} className="book-card">
                  {book.image64 && (
                    <img
                      src={`data:image/png;base64,${book.image64}`}
                      alt={book.title}
                      className="book-image"
                    />
                  )}
                  <h4>{book.title}</h4>
                  <p>{book.author}</p>
                  <small>Tipo: {book.type}</small>
                </div>
              ))
            ) : (
              <p>No se encontraron libros</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default LectorHomePage;
