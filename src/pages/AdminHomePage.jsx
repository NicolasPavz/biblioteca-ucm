import { useEffect, useState } from "react";
import { getAllBooks, searchBookByType } from "../services/bookService";
import HeaderAdmin from "../components/HeaderAdmin";
import SearchBar from "../components/SearchBarComponent";
import BookCard from "../components/BookCardComponent";
import LoadingSpinner from "../components/LoadingSpinnerComponent";
import "../styles/HomePage.css";

const AdminHomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllBooks();
      setBooks(response);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
      setError("Error al cargar los libros. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleTypeSearch = async (searchType) => {
    if (!searchType.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      const result = await searchBookByType(searchType.trim());
      setBooks(result);
    } catch (error) {
      console.error("Error al buscar por tipo:", error);
      setError("Error al buscar libros. Por favor, intenta de nuevo.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    fetchAllBooks();
  };

  return (
    <div className="home-page">
      <HeaderAdmin />
      <main className="home-content">
        <div className="home-header">
          <h1 className="home-title">Bienvenido - Biblioteca UCM</h1>
        </div>

        <SearchBar 
          onSearch={handleTypeSearch}
          onClear={handleClear}
          disabled={loading}
        />

        <div className="books-section">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={fetchAllBooks} className="retry-button">
                Intentar de nuevo
              </button>
            </div>
          ) : (
            <BookList books={books} />
          )}
        </div>
      </main>
    </div>
  );
};

const BookList = ({ books }) => {
  if (!Array.isArray(books) || books.length === 0) {
    return (
      <div className="no-books-message">
        <p>No se encontraron libros</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default AdminHomePage;