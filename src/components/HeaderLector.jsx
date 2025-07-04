import { useNavigate } from "react-router-dom";
import "./Header.css";

const HeaderLector = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/");
  };

  return (
    <header className="home-header">
      <div className="logo">Biblioteca UCM</div>
      <nav className="nav-buttons">
        <button onClick={() => navigate("/home-lector")}>Home</button>
        <button onClick={() => navigate("/prestamos")}>Mis Préstamos</button>
        <button onClick={() => navigate("/multas")}>Mis Multas</button>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </nav>
    </header>
  );
};

export default HeaderLector;
