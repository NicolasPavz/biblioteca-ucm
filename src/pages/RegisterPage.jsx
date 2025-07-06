import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import Header from "../components/Header";
import RegisterForm from "../components/RegisterFormComponent";
import "../styles/RegisterPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await register(form);
      setSuccess("Usuario registrado correctamente. Redirigiendo...");
      setTimeout(() => navigate("/auth/login"), 2000);
    } catch (err) {
      console.error(err);
      setError("No se pudo registrar el usuario. Verifica que el correo no esté en uso.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/auth/login");
  };

  return (
    <div className="register-page">
      <Header />
      <main className="register-content">
        <div className="register-header">
          <h1 className="register-title">Crear Cuenta</h1>
          <p className="register-subtitle">Únete a la Biblioteca UCM</p>
        </div>

        <div className="register-wrapper">
          <div className="register-container">
            <RegisterForm
              form={form}
              loading={loading}
              error={error}
              success={success}
              onSubmit={handleSubmit}
              onChange={handleChange}
              onLoginClick={handleLoginClick}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;