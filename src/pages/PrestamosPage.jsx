import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getBookingsByEmail } from "../services/bookingService";
import HeaderLector from "../components/HeaderLector";

const PrestamosPage = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const email = decoded.sub.split("#")[0];

        const res = await getBookingsByEmail(email);
        setBookings(res);
      } catch (error) {
        console.error("Error al obtener los préstamos:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="home-page">
      <HeaderLector />
      <main className="home-content">
        <h2>Mis Préstamos</h2>
        {bookings.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Fecha Préstamo</th>
                <th>Fecha Devolución</th>
                <th>Devuelto</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.copy?.book?.title || "Desconocido"}</td>
                  <td>{b.dateBooking}</td>
                  <td>{b.dateReturn || "Pendiente"}</td>
                  <td>{b.state ? "Sí" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tienes préstamos registrados.</p>
        )}
      </main>
    </div>
  );
};

export default PrestamosPage;
