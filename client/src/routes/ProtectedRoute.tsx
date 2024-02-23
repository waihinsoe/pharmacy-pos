import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AUTH_STATUS } from "../types/AuthTypes";

export const ProtectedRoute = () => {
  const { isAuthenticated, status } = useAuth();

  if (status === AUTH_STATUS.PENDING) return <div>...loading</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} replace />;
};
