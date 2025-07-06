import { useState } from "react";
import { getCopyByTitle } from "../services/bookService";
import { createBooking } from "../services/bookingService";
import HeaderAdmin from "../components/HeaderAdmin";
import LoadingSpinner from "../components/LoadingSpinnerComponent";
import "../styles/PrestamoAdminPage.css";

const PrestamoAdminPage = () => {
  const [title, setTitle] = useState("");
  const [copies, setCopies] = useState([]);
  const [selectedCopy, setSelectedCopy] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleSearchCopies = async () => {
    if (!title.trim()) {
      setError("Por favor, ingresa el título del libro");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getCopyByTitle(title.trim());
      setCopies(data);
      setSelectedCopy(null);
      
      if (data.length === 0) {
        setError("No se encontraron copias disponibles para este título");
      }
    } catch (err) {
      console.error("Error al buscar copias:", err);
      alert("Error al buscar copias disponibles. Por favor, intenta de nuevo.");
      setCopies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchCopies();
    }
  };

  const handleCreateBooking = async () => {
    if (!selectedCopy || !email.trim()) {
      setError("Debes seleccionar una copia y escribir el correo del lector.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await createBooking({
        userFk: email.trim(),
        copyBookFk: selectedCopy.id,
      });
      
      alert("Préstamo realizado exitosamente");
      setEmail("");
      setSelectedCopy(null);
      setCopies([]);
      setTitle("");
    } catch (error) {
      console.error("Error al crear préstamo:", error);
      alert("No se pudo crear el préstamo. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearForm = () => {
    setTitle("");
    setCopies([]);
    setSelectedCopy(null);
    setEmail("");
    setError(null);

  };

  return (
    <div className="prestamo-admin-page">
      <HeaderAdmin />
      <main className="prestamo-admin-content">
        <div className="prestamo-admin-header">
          <h1 className="prestamo-admin-title">Administrar Préstamos</h1>
          <p className="prestamo-admin-subtitle">
            Busca libros disponibles y crea préstamos para los lectores
          </p>
        </div>

        {/* Mensajes de estado */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => setError(null)} className="dismiss-button">
              Cerrar
            </button>
          </div>
        )}

      

        {/* Formulario de búsqueda */}
        <div className="search-section">
          <h2 className="section-title">Buscar Libro</h2>
          <div className="search-form">
            <input
              type="text"
              placeholder="Título del libro"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-input"
              disabled={loading}
            />
            <div className="search-buttons">
              <button 
                onClick={handleSearchCopies}
                className="search-button"
                disabled={loading}
              >
                {loading ? "Buscando..." : "Buscar copias"}
              </button>
              <button 
                onClick={handleClearForm}
                className="clear-button"
                disabled={loading}
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>

        {/* Resultados de búsqueda */}
        {loading && <LoadingSpinner />}

        {copies.length > 0 && !loading && (
          <div className="copies-section">
            <h2 className="section-title">Copias Disponibles</h2>
            <div className="copies-grid">
              {copies.map((copy) => (
                <div
                  key={copy.id}
                  onClick={() => setSelectedCopy(copy)}
                  className={`copy-card ${selectedCopy?.id === copy.id ? "selected" : ""}`}
                >
                  <div className="copy-info">
                    <h3 className="copy-title">{copy.book.title}</h3>
                    <p className="copy-author">Por {copy.book.author}</p>
                    <p className="copy-type">Tipo: {copy.book.type}</p>
                    <p className="copy-id">ID Copia: {copy.id}</p>
                  </div>
                  {selectedCopy?.id === copy.id && (
                    <div className="selected-indicator">
                      ✓ Seleccionado
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formulario de préstamo */}
        {selectedCopy && (
          <div className="booking-section">
            <h2 className="section-title">Crear Préstamo</h2>
            <div className="selected-copy-info">
              <h3>Libro seleccionado:</h3>
              <div className="selected-copy-details">
                <p><strong>{selectedCopy.book.title}</strong></p>
                <p>Autor: {selectedCopy.book.author}</p>
                <p>Tipo: {selectedCopy.book.type}</p>
                <p>ID Copia: {selectedCopy.id}</p>
              </div>
            </div>

            <div className="booking-form">
              <input
                type="email"
                placeholder="Correo electrónico del lector"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="email-input"
                disabled={loading}
              />
              <button 
                onClick={handleCreateBooking}
                className="confirm-button"
                disabled={loading}
              >
                {loading ? "Procesando..." : "Confirmar Préstamo"}
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default PrestamoAdminPage;