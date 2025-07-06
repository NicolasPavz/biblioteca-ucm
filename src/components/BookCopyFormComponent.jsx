import "../styles/BookCopyForm.css";

const BookCopyForm = ({ 
    searchTitle, 
    setSearchTitle, 
    results, 
    selectedBook, 
    setSelectedBook, 
    loading, 
    onSearch, 
    onCreateCopy 
}) => {
    return (
        <div className="book-copy-form-container">
            <div className="search-section">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Buscar libro por título..."
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                        className="form-input"
                        disabled={loading}
                    />
                </div>
                
                <button
                    onClick={onSearch}
                    className="search-button"
                    disabled={loading}
                >
                    {loading ? "Buscando..." : "Buscar libro"}
                </button>
            </div>

            {results.length > 0 && (
                <div className="search-results">
                    <p className="results-title">Resultados:</p>
                    <ul className="results-list">
                        {results.map((book) => (
                            <li
                                key={book.id}
                                className={`result-item ${selectedBook?.id === book.id ? "selected" : ""}`}
                                onClick={() => setSelectedBook(book)}
                            >
                                <strong>{book.title}</strong> — {book.author} ({book.type})
                            </li>
                        ))}
                    </ul>
                    
                    <button
                        onClick={onCreateCopy}
                        disabled={!selectedBook || loading}
                        className="copy-button"
                    >
                        {loading ? "Creando copia..." : "Crear copia del libro seleccionado"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookCopyForm;