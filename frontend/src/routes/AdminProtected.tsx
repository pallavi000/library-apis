import { Navigate, Outlet } from "react-router-dom";
// types
import { useGlobalContext } from "../context/GlobalContext";

function AdminProtected() {
  const { user } = useGlobalContext();
  return user?.isAdmin ? (
    <Outlet />
  ) : (
    // Permission denied. Forbidden page maybe?
    <Navigate to={"/"} replace />
  );
}

export default AdminProtected;
