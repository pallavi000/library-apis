import { Navigate, Outlet } from "react-router-dom";

// types
import { useGlobalContext } from "../context/GlobalContext";

// routers

function UserProtected() {
  const { user } = useGlobalContext();
  console.log(user);
  // showing user side page to admins too
  return user ? <Outlet /> : <Navigate to={"/sign-in"} replace />;
}

export default UserProtected;
