import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getBookingsByEmail } from "../services/bookingService";
import HeaderLector from "../components/HeaderLector";
import LoadingSpinner from "../components/LoadingSpinnerComponent";
import "../styles/HomePage.css";
import "../styles/PrestamosPage.css";

const PrestamosPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const email = decoded.sub.split("#")[0];

      const res = await getBookingsByEmail(email);
      setBookings(res);
    } catch (error) {
      console.error("Error al obtener los préstamos:", error);
      setError("Error al cargar los préstamos. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (state) => {
    return state ? "#27ae60" : "#95a5a6";
  };

  const getStatusText = (state) => {
    return state ? "Activo" : "Devuelto";
  };

  return (
    <div className="home-page">
      <HeaderLector />
      <main className="home-content">
        <div className="home-header">
          <h1 className="home-title">Mis Préstamos</h1>
        </div>

        <div className="prestamos-section">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={fetchBookings} className="retry-button">
                Intentar de nuevo
              </button>
            </div>
          ) : (
            <BookingsList bookings={bookings} getStatusColor={getStatusColor} getStatusText={getStatusText} />
          )}
        </div>
      </main>
    </div>
  );
};

// Componente para la lista de préstamos
const BookingsList = ({ bookings, getStatusColor, getStatusText }) => {
  if (!Array.isArray(bookings) || bookings.length === 0) {
    return (
      <div className="no-bookings-message">
        <div className="no-bookings-icon">📚</div>
        <h3>No tienes préstamos registrados</h3>
        <p>Cuando solicites un libro, aparecerá aquí</p>
      </div>
    );
  }

  return (
    <div className="bookings-container">
      <div className="bookings-header">
        <div className="bookings-stats">
          <span className="stat-item active">
            Activos: {bookings.filter(b => b.state).length}
          </span>
        </div>
      </div>

      <div className="table-container">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Tipo</th>
              <th>Fecha Préstamo</th>
              <th>Fecha Devolución</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className={booking.state ? "active-booking" : "returned-booking"}>
                <td className="book-title">{booking.copyBook?.book?.title || "N/A"}</td>
                <td>{booking.copyBook?.book?.author || "N/A"}</td>
                <td>
                  <span className="book-type-badge">
                    {booking.copyBook?.book?.type || "N/A"}
                  </span>
                </td>
                <td>{new Date(booking.dateBooking).toLocaleDateString()}</td>
                <td>{new Date(booking.dateReturn).toLocaleDateString()}</td>
                <td>
                  <span 
                    className="status-badge"
                    style={{ 
                      backgroundColor: getStatusColor(booking.state),
                      color: "white"
                    }}
                  >
                    {getStatusText(booking.state)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrestamosPage;