import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";

const PrivateRoute = () => {
  const isAuthenticated = useAuth();
  // console.log(isAuthenticated.authTokens);
  return isAuthenticated.authTokens ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
