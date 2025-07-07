import { useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import { getReaderByEmail, changeReaderState } from "../services/readerService";
import { getBookingsByEmail } from "../services/bookingService";
import { getFinesByEmail } from "../services/fineService";
import "../styles/LectorAdminPage.css";

const LectorAdminPage = () => {
  const [email, setEmail] = useState("");
  const [lector, setLector] = useState(null);
  const [prestamos, setPrestamos] = useState([]);
  const [multas, setMultas] = useState([]);
  const [seccion, setSeccion] = useState("datos");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setMensaje("");
    setLoading(true);
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
      setMensaje("No se encontró el lector. Por favor, verifica el email.");
      setLector(null);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleState = async () => {
    try {
      const updated = await changeReaderState(email, !lector.state);
      setLector({ ...lector, state: updated.state });
      setMensaje("Estado actualizado correctamente.");
    } catch (err) {
      console.error("Error actualizando estado del lector:", err);
      setMensaje("Error al actualizar el estado del lector.");
    }
  };

  const handleSeccionChange = async (newSeccion) => {
    setSeccion(newSeccion);
    if (newSeccion === "prestamos") {
      const data = await getBookingsByEmail(email);
      setPrestamos(data);
    } else if (newSeccion === "multas") {
      const data = await getFinesByEmail(email);
      setMultas(data);
    }
  };

  return (
    <div className="admin-page">
      <HeaderAdmin />
      <main className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title">Gestión de Lectores</h1>
        </div>

        <SearchSection
          email={email}
          setEmail={setEmail}
          onSearch={handleSearch}
          loading={loading}
        />

        {mensaje && (
          <div className={`message ${lector ? 'success' : 'error'}`}>
            <p>{mensaje}</p>
          </div>
        )}

        {lector && (
          <div className="lector-section">
            <TabNavigation
              seccion={seccion}
              onSeccionChange={handleSeccionChange}
            />

            <div className="content-section">
              {seccion === "datos" && (
                <DatosLector
                  lector={lector}
                  onToggleState={handleToggleState}
                />
              )}
              {seccion === "prestamos" && (
                <PrestamosList prestamos={prestamos} />
              )}
              {seccion === "multas" && (
                <MultasList multas={multas} />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Componente para la sección de búsqueda
const SearchSection = ({ email, setEmail, onSearch, loading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      onSearch();
    }
  };

  return (
    <div className="search-section">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="email"
          placeholder="Correo electrónico del lector"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="search-input"
          disabled={loading}
          required
        />
        <button 
          type="submit" 
          className="search-button"
          disabled={loading || !email.trim()}
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>
    </div>
  );
};

// Componente para la navegación de pestañas
const TabNavigation = ({ seccion, onSeccionChange }) => {
  const tabs = [
    { id: "datos", label: "Datos del Lector" },
    { id: "prestamos", label: "Préstamos" },
    { id: "multas", label: "Multas" }
  ];

  return (
    <div className="tab-navigation">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-button ${seccion === tab.id ? 'active' : ''}`}
          onClick={() => onSeccionChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

// Componente para mostrar los datos del lector
const DatosLector = ({ lector, onToggleState }) => {
  return (
    <div className="datos-container">
      <div className="datos-card">
        <h3>Información del Lector</h3>
        <div className="datos-grid">
          <div className="dato-item">
            <span className="dato-label">Nombre:</span>
            <span className="dato-value">{lector.name} {lector.lastName}</span>
          </div>
          <div className="dato-item">
            <span className="dato-label">Email:</span>
            <span className="dato-value">{lector.email}</span>
          </div>
          <div className="dato-item">
            <span className="dato-label">Estado:</span>
            <span className={`dato-value status ${lector.state ? 'active' : 'inactive'}`}>
              {lector.state ? "Activo" : "Inactivo"}
            </span>
          </div>
        </div>
        <button 
          onClick={onToggleState} 
          className={`toggle-button ${lector.state ? 'deactivate' : 'activate'}`}
        >
          {lector.state ? "Desactivar" : "Activar"} lector
        </button>
      </div>
    </div>
  );
};

// Componente para mostrar la lista de préstamos
const PrestamosList = ({ prestamos }) => {
  if (!prestamos || prestamos.length === 0) {
    return (
      <div className="no-data-message">
        <p>No se encontraron préstamos para este lector.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <h3>Préstamos del Lector</h3>
      <div className="table-wrapper">
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
                <td>
                  <span className={`status ${p.state ? 'active' : 'returned'}`}>
                    {p.state ? "Activo" : "Devuelto"}
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

// Componente para mostrar la lista de multas
const MultasList = ({ multas }) => {
  if (!multas || multas.length === 0) {
    return (
      <div className="no-data-message">
        <p>No se encontraron multas para este lector.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <h3>Multas del Lector</h3>
      <div className="table-wrapper">
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
                <td>
                  <span className={`status ${f.state ? 'pending' : 'paid'}`}>
                    {f.state ? "Pendiente" : "Pagado"}
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

export default LectorAdminPage;