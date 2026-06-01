import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const logado =
    localStorage.getItem("adminLogado");

  return logado === "true"
    ? children
    : <Navigate to="/login-admin" />;
}

export default PrivateRoute;