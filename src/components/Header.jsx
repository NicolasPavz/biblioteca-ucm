import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="home-header">
      <div className="logo">Biblioteca UCM</div>
      <nav className="nav-buttons">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => alert("aaaa")}>
          About
        </button>
        <button onClick={() => navigate("/auth/login")}>Login</button>
      </nav>
    </header>
  );
};

export default Header;
