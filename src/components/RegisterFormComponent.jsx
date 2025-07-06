import "../styles/RegisterForm.css";

const RegisterForm = ({ form, loading, error, success, onSubmit, onChange, onLoginClick }) => {
  return (
    <div className="register-form-container">
      <form onSubmit={onSubmit} className="register-form">
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={form.name}
              onChange={onChange}
              required
              className="form-input"
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="lastName"
              placeholder="Apellido"
              value={form.lastName}
              onChange={onChange}
              required
              className="form-input"
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={onChange}
            required
            className="form-input"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={onChange}
            required
            className="form-input"
            disabled={loading}
            minLength="6"
          />
        </div>

        <button 
          type="submit" 
          className="register-button"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      <div className="form-footer">
        <button
          type="button"
          className="login-button"
          onClick={onLoginClick}
          disabled={loading}
        >
          ¿Ya tienes cuenta? Inicia sesión
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="success-message">
          <p>{success}</p>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;