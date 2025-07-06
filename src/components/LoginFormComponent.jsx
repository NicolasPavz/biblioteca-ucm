import "../styles/LoginForm.css";

const LoginForm = ({ form, loading, error, onSubmit, onChange, onRegisterClick }) => {
  return (
    <div className="login-form-container">
      <form onSubmit={onSubmit} className="login-form">
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
          />
        </div>

        <button 
          type="submit" 
          className="login-button"
          disabled={loading}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <div className="form-footer">
        <button
          type="button"
          className="register-button"
          onClick={onRegisterClick}
          disabled={loading}
        >
          ¿No tienes cuenta? Regístrate
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;