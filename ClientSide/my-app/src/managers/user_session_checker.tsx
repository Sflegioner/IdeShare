import React from "react";
import { Cookies } from "react-cookie";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: any) => {
  const cookies = new Cookies();

  if (cookies.get('IsAuth') !== true) {
    return <Navigate to="/login_registration_page" />;
  }

  return children;
};