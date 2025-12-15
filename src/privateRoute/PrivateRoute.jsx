import React from "react";
import { isLoggedIn } from "../utils/helpers/auth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  if (!isLoggedIn()) {
    return <Navigate to={"/studentLogin"} state={{ from: location }} replace />;
  }
  return children;
};

export default PrivateRoute;
