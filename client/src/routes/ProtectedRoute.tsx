import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const context = useAuth();
  console.log(context);
  const user = localStorage.getItem("user");
  console.log(user);
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet />;
};
