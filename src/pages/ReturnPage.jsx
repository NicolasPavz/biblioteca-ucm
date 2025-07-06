import { useState } from "react";
import { getBookingsByEmail, returnBooking } from "../services/bookingService";
import HeaderAdmin from "../components/HeaderAdmin";
import LoadingSpinner from "../components/LoadingSpinnerComponent";
import "../styles/ReturnPage.css";

const ReturnPage = () => {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!email.trim()) {
      setError("Por favor, ingresa el correo del lector");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);
      const data = await getBookingsByEmail(email.trim());
      setBookings(data);
      
      if (data.length === 0) {
        setError("No se encontraron préstamos para este correo");
      }
    } catch (err) {
      console.error("Error buscando préstamos:", err);
      setError("Error al buscar préstamos. Por favor, intenta de nuevo.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleReturn = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      await returnBooking(id);
      alert("Libro devuelto exitosamente");
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, state: false } : b
        )
      );
    } catch (err) {
      console.error("Error al devolver libro:", err);
      setError("Error al devolver el libro. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearForm = () => {
    setEmail("");
    setBookings([]);
    setError(null);
    setHasSearched(false);
  };

  return (
    <div className="devolucion-page">
      <HeaderAdmin />
      <main className="devolucion-content">
        <div className="devolucion-header">
          <h1 className="devolucion-title">Gestión de Devoluciones</h1>
          <p className="devolucion-subtitle">
            Busca préstamos activos y gestiona las devoluciones
          </p>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => setError(null)} className="dismiss-button">
              Cerrar
            </button>
          </div>
        )}


        <div className="search-section">
          <h2 className="section-title">Buscar Préstamos</h2>
          <div className="search-form">
            <input
              type="email"
              placeholder="Correo electrónico del lector"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-input"
              disabled={loading}
            />
            <div className="search-buttons">
              <button 
                onClick={handleSearch}
                className="search-button"
                disabled={loading}
              >
                {loading ? "Buscando..." : "Buscar préstamos"}
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

        {loading && <LoadingSpinner />}

        {bookings.length > 0 && !loading && (
          <div className="bookings-section">
            <h2 className="section-title">Préstamos Encontrados</h2>
            <div className="table-container">
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Fecha Préstamo</th>
                    <th>Fecha Devolución</th>
                    <th>Estado</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="book-title">{booking.copyBook.book.title}</td>
                      <td className="book-author">{booking.copyBook.book.author}</td>
                      <td className="date-cell">
                        {new Date(booking.dateBooking).toLocaleDateString()}
                      </td>
                      <td className="date-cell">
                        {new Date(booking.dateReturn).toLocaleDateString()}
                      </td>
                      <td className="status-cell">
                        <span className={`status-badge ${booking.state ? 'active' : 'returned'}`}>
                          {booking.state ? "Activo" : "Devuelto"}
                        </span>
                      </td>
                      <td className="action-cell">
                        <button
                          onClick={() => handleReturn(booking.id)}
                          disabled={!booking.state || loading}
                          className={`return-button ${booking.state ? 'enabled' : 'disabled'}`}
                        >
                          {booking.state ? "Confirmar devolución" : "Ya devuelto"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {hasSearched && bookings.length === 0 && !loading && !error && (
          <div className="no-bookings-message">
            <p>No se encontraron préstamos para "{email}"</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ReturnPage;