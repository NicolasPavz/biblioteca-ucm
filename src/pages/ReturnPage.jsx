import { useState } from "react";
import { getBookingsByEmail, returnBooking } from "../services/bookingService";
import HeaderAdmin from "../components/HeaderAdmin";

const DevolucionPage = () => {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const handleSearch = async () => {
    try {
      setMensaje("");
      const data = await getBookingsByEmail(email.trim());
      setBookings(data);
    } catch (err) {
      console.error("Error buscando préstamos:", err);
      alert("Error al buscar préstamos.");
    }
  };

  const handleReturn = async (id) => {
    try {
      await returnBooking(id);
      alert("Libro devuelto exitosamente.");
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, state: false } : b
        )
      );
    } catch (err) {
      console.error("Error al devolver libro:", err);
      alert("Error al devolver el libro.");
    }
  };

  return (
    <div className="home-page">
      <HeaderAdmin />
      <main className="home-content">
        <h2>Gestión de Devoluciones</h2>

        <div className="form-libro">
          <input
            type="email"
            placeholder="Correo del lector"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSearch}>Buscar préstamos</button>
        </div>

        {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}

        {bookings.length > 0 ? (
          <table className="data-table" style={{ marginTop: "1rem" }}>
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
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.copyBook.book.title}</td>
                  <td>{b.copyBook.book.author}</td>
                  <td>{new Date(b.dateBooking).toLocaleDateString()}</td>
                  <td>{new Date(b.dateReturn).toLocaleDateString()}</td>
                  <td style={{ color: b.state ? "green" : "gray" }}>
                    {b.state ? "Activo" : "Devuelto"}
                  </td>
                  <td>
                          <button
                              onClick={() => handleReturn(b.id)}
                              disabled={!b.state}
                              style={{
                                  backgroundColor: b.state ? "#007bff" : "#ccc",
                                  color: "#fff",
                                  padding: "6px 12px",
                                  border: "none",
                                  borderRadius: "4px",
                                  cursor: b.state ? "pointer" : "not-allowed",
                                  opacity: b.state ? 1 : 0.6
                              }}
                          >
                              Confirmar devolución
                          </button>
                      </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No se encontraron préstamos.</p>
        )}
      </main>
    </div>
  );
};

export default DevolucionPage;
