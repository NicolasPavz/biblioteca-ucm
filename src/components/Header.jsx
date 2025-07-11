import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="home-header">
      <div className="logo">Biblioteca UCM</div>
      <nav className="nav-buttons">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => alert("Integrantes: NIcolass Miguel Pavez Molina")}>
          About
        </button>
        <button onClick={() => navigate("/auth/login")}>Login</button>
      </nav>
    </header>
  );
};

export default Header;