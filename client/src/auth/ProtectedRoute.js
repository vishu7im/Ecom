import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";
function Unprotected({ isBlocked, children }) {
  const isAuthenticated = !!Cookies.get("Auth");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default Unprotected;
