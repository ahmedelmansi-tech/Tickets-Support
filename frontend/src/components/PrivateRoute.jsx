import { useAuth } from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import Spinner from "./Spinner";

const PrivateRoute = () => {
  const { loggedIn, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
