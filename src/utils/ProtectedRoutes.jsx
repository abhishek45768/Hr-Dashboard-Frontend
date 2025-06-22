import Cookies from "js-cookie";
import { Outlet } from "react-router";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return element ? element : <Outlet />;
};

export default PrivateRoute;
