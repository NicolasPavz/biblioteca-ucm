import { useEffect, useState } from "react";
import { getAllBooks } from "../services/bookService";
import Header from "../components/header";
import "./HomePage.css";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getAllBooks();
        if (response && response.length > 0) {
          setBooks(response);
          setAllBooks(response);
        } else {
          console.warn("No se encontraron libros");
        }
      } catch (error) {
        console.error("Error al obtener los libros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = () => {
    const filtered = allBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    );
    setBooks(filtered);
  };

  const handleClear = () => {
    setSearch("");
    setBooks(allBooks);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <Header />
      <main className="home-content">
        <div className="search-section">
          <input
            type="text"
            placeholder="Buscar libros por título o autor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-bar"
          />
          <button onClick={handleSearch} className="search-button">
            Buscar
          </button>
          <button onClick={handleClear} className="clear-button">
            Limpiar
          </button>
        </div>

        {loading ? (
          <p className="loading-text">Cargando libros...</p>
        ) : (
          <div className="book-list">
            {books.length > 0 ? (
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

export default HomePage;
