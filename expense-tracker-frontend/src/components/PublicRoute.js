import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../services/authService";

const PublicRoute = ({ children }) => {
  return isLoggedIn() ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
