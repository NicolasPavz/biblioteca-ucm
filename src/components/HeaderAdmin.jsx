import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

const HeaderAdmin = () => {
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
        <button onClick={() => navigate("/home-admin")}>Home</button>
        <button onClick={() => navigate("/book")}>Nuevo Libro</button>
        <button onClick={() => navigate("/admin/prestamo")}>Préstamo</button>
        <button onClick={() => navigate("/admin/devolucion")}>Devolución</button>
        <button onClick={() => navigate("/admin/lector")}>Lector</button>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </nav>
    </header>
  );
};

export default HeaderAdmin;
