import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RolRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/auth/login" />;

  try {
    const decoded = jwtDecode(token);
    const role = decoded.sub.split("#")[1];
    return allowedRoles.includes(role) ? children : <Navigate to="/" />;
  } catch {
    return <Navigate to="/auth/login" />;
  }
};

export default RolRoute;
