import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { jwtDecode } from "jwt-decode";
import Header from "../components/header";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(form);
      const token = res.data.token;
      const rol = res.data.rol;

      if (!token) {
        setError("No se recibió un token válido.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("rol", rol);

      const decoded = jwtDecode(token);
      const role = decoded.sub.split("#")[1];

      if (role === "ADMIN") navigate("/home-admin");
      else if (role === "LECTOR") navigate("/home-lector");
      else setError("Rol no permitido.");
    } catch (err) {
      console.error(err);
      setError("Email o contraseña inválidos");
    }
  };

  return (
    <div>
      <Header />
      <div className="login-wrapper">
        <div className="login-container">
          <h2>Iniciar sesión</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Correo"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Ingresar</button>
          </form>

          <button
            className="register-button"
            onClick={() => navigate("/auth/register")}
          >
            ¿No tienes cuenta? Regístrate
          </button>

          {error && <p className="login-error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
