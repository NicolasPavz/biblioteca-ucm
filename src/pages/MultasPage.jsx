import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getFinesByEmail } from "../services/fineService";
import HeaderLector from "../components/HeaderLector";
import LoadingSpinner from "../components/LoadingSpinnerComponent";
import "../styles/HomePage.css";
import "../styles/MultasPage.css";

const MultasPage = () => {
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFines();
  }, []);

  const fetchFines = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const email = decoded.sub.split("#")[0];

      const res = await getFinesByEmail(email);
      setFines(res);
    } catch (error) {
      console.error("Error al obtener las multas:", error);
      setError("Error al cargar las multas. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (state) => {
    return state ? "#e74c3c" : "#27ae60";
  };

  const getStatusText = (state) => {
    return state ? "Pendiente" : "Pagada";
  };


  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount);
  };

  return (
    <div className="home-page">
      <HeaderLector />
      <main className="home-content">
        <div className="home-header">
          <h1 className="home-title">Mis Multas</h1>
        </div>

        <div className="multas-section">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={fetchFines} className="retry-button">
                Intentar de nuevo
              </button>
            </div>
          ) : (
            <FinesList 
              fines={fines} 
              getStatusColor={getStatusColor} 
              getStatusText={getStatusText}
              formatCurrency={formatCurrency}
            />
          )}
        </div>
      </main>
    </div>
  );
};


const FinesList = ({ fines, getStatusColor, getStatusText, formatCurrency }) => {
  if (!Array.isArray(fines) || fines.length === 0) {
    return (
      <div className="no-fines-message">
        <h3>¡Excelente! No tienes multas</h3>
      </div>
    );
  }

  return (
    <div className="fines-container">
      <div className="fines-header">
        <div className="fines-summary">
          <h3>Resumen de Multas</h3>
        </div>
      </div>

      <div className="table-container">
        <table className="fines-table">
          <thead>
            <tr>
              <th>Monto</th>
              <th>Descripción</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {fines.map((fine) => (
              <tr key={fine.id} className={fine.state ? "pending-fine" : "paid-fine"}>
                <td className="fine-amount">
                  <span className="amount-value">
                    {formatCurrency(fine.amount)}
                  </span>
                </td>
                <td className="fine-description">{fine.description}</td>
                <td>
                  <span 
                    className="status-badge"
                    style={{ 
                      backgroundColor: getStatusColor(fine.state),
                      color: "white"
                    }}
                  >
                    {getStatusText(fine.state)}
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

export default MultasPage;