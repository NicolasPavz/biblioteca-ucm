import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LectorHomePage from "./pages/LectorHomePage";
import AdminHomePage from "./pages/AdminHomePage";
import RoleBasedRoute from "./routes/RolRoute";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import MultasPage from "./pages/MultasPage";
import PrestamosPage from "./pages/PrestamosPage";
import BookPage from "./pages/BookPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />


      <Route
        path="/home-lector"
        element={
          <RoleBasedRoute allowedRoles={["LECTOR"]}>
            <LectorHomePage />
          </RoleBasedRoute>
        }
      />
      <Route
        path="/home-admin"
        element={
          <RoleBasedRoute allowedRoles={["ADMIN"]}>
            <AdminHomePage />
          </RoleBasedRoute>
        }
      />
      <Route path="/prestamos" element={<PrestamosPage />} />
      <Route path="/multas" element={<MultasPage />} />
      <Route path="/book" element={<BookPage />} />
    </Routes>
  );
}

export default App;
