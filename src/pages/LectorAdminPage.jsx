import { useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import { getReaderByEmail, changeReaderState} from "../services/readerService"
import { getBookingsByEmail } from "../services/bookingService";
import { getFinesByEmail } from "../services/fineService";
import "../styles/LectorAdminPage.css";

const LectorAdminPage = () => {
  const [email, setEmail] = useState("");
  const [lector, setLector] = useState(null);
  const [prestamos, setPrestamos] = useState([]);
  const [multas, setMultas] = useState([]);
  const [seccion, setSeccion] = useState("datos"); // 'datos' | 'prestamos' | 'multas'
  const [mensaje, setMensaje] = useState("");
  

  const handleSearch = async () => {
    setMensaje("");
    try {
      const userRes = await getReaderByEmail(email);
      setLector(userRes);

      if (seccion === "prestamos") {
        const bookingRes = await getBookingsByEmail(email);
        setPrestamos(bookingRes);
      }

      if (seccion === "multas") {
        const fineRes = await getFinesByEmail(email);
        setMultas(fineRes);
      }
    } catch (error) {
      console.error("Error al obtener datos del lector:", error);
      alert("No se encontró el lector.");
      setLector(null);
    }
  };

  const handleToggleState = async () => {
    try {
      const updated = await changeReaderState(email, !lector.state);
      setLector({ ...lector, state: updated.state });
      alert("Estado actualizado correctamente.");
    } catch (err) {
      console.error("Error actualizando estado del lector:", err);
    }
  };

  const renderDatos = () => (
    <div className="datos-container">
      <table className="datos-table">
        <tbody>
          <tr>
            <th>Nombre</th>
            <td>{lector.name} {lector.lastName}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{lector.email}</td>
          </tr>
          <tr>
            <th>Estado</th>
            <td>{lector.state ? "Activo" : "Inactivo"}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleToggleState} className="btn-toggle-estado">
        {lector.state ? "Desactivar" : "Activar"} lector
      </button>
      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
    </div>
  );


  const renderPrestamos = () => (
    prestamos.length > 0 ? (
      <table className="data-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Fecha Préstamo</th>
            <th>Fecha Devolución</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.map(p => (
            <tr key={p.id}>
              <td>{p.copyBook.book.title}</td>
              <td>{p.copyBook.book.author}</td>
              <td>{new Date(p.dateBooking).toLocaleDateString()}</td>
              <td>{new Date(p.dateReturn).toLocaleDateString()}</td>
              <td style={{ color: p.state ? "green" : "gray" }}>
                {p.state ? "Activo" : "Devuelto"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : <p>No tiene préstamos.</p>
  );

  const renderMultas = () => (
    multas.length > 0 ? (
      <table className="data-table">
        <thead>
          <tr>
            <th>Monto</th>
            <th>Descripción</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {multas.map(f => (
            <tr key={f.id}>
              <td>${f.amount}</td>
              <td>{f.description}</td>
              <td style={{ color: f.state ? "Pendiente" : "Pagado" }}>
                {f.state ? "Pendiente" : "Pagado"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : <p>No tiene multas.</p>
  );

  return (
    <div className="home-page">
      <HeaderAdmin />
      <main className="home-content">
        <h2>Gestión de Lectores</h2>

        <div className="form-libro">
          <input
            type="email"
            placeholder="Correo del lector"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>

        {lector && (
          <div style={{ marginTop: "1rem" }}>
            <div className="seccion-buttons centered-buttons">
              <button className="tab-button" onClick={() => setSeccion("datos")}>
                Datos Lector
              </button>
              <button className="tab-button" onClick={async () => {
                setSeccion("prestamos");
                const data = await getBookingsByEmail(email);
                setPrestamos(data);
              }}>
                Préstamos
              </button>
              <button className="tab-button" onClick={async () => {
                setSeccion("multas");
                const data = await getFinesByEmail(email);
                setMultas(data);
              }}>
                Multas
              </button>
            </div>


            <div style={{ marginTop: "1rem" }}>
              {seccion === "datos" && renderDatos()}
              {seccion === "prestamos" && renderPrestamos()}
              {seccion === "multas" && renderMultas()}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LectorAdminPage;
