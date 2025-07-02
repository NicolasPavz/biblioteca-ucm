import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import Header from "../components/header";
import "./RegisterPage.css";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await register(form);
      setSuccess("Usuario registrado correctamente. Redirigiendo...");
      setTimeout(() => navigate("/auth/login"), 1000);
    } catch (err) {
      console.error(err);
      setError("No se pudo registrar el usuario.");
    }
  };

  return (
    <div>
      <Header />
    <div className="register-wrapper">
      <div className="register-container">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Apellido"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
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
          <button type="submit">Registrarse</button>
        </form>
        {error && <p className="register-error">{error}</p>}
        {success && <p className="register-success">{success}</p>}
      </div>
    </div>
    </div>
  );
};

export default RegisterPage;
