// ProtectedRoute.js

import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext/AuthContext";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/admin/login" replace />}
    />
  );
};

export default ProtectedRoute;
