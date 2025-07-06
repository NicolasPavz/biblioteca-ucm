import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { jwtDecode } from "jwt-decode";
import Header from "../components/Header";
import LoginForm from "../components/LoginFormComponent";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate("/auth/register");
  };

  return (
    <div className="login-page">
      <Header />
      <main className="login-content">
        <div className="login-header">
          <h1 className="login-title">Iniciar Sesión</h1>
          <p className="login-subtitle">Accede a tu cuenta de la Biblioteca UCM</p>
        </div>

        <div className="login-wrapper">
          <div className="login-container">
            <LoginForm
              form={form}
              loading={loading}
              error={error}
              onSubmit={handleSubmit}
              onChange={handleChange}
              onRegisterClick={handleRegisterClick}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;