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
                <th>Autor</th>
                <th>Tipo</th>
                <th>Fecha Préstamo</th>
                <th>Fecha Devolución</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.copyBook?.book?.title}</td>
                  <td>{b.copyBook?.book?.author}</td>
                  <td>{b.copyBook?.book?.type}</td>
                  <td>{new Date(b.dateBooking).toLocaleDateString()}</td>
                  <td>{new Date(b.dateReturn).toLocaleDateString()}</td>
                  <td style={{ color: b.state ? "green" : "gray" }}>
                    {b.state ? "Activo" : "Devuelto"}
                  </td>
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
