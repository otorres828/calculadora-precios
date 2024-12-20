import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const RedirectPanel = ({  children,redirectTo = "/recetas",}) => {
  const token = localStorage.getItem("token");

  if ( token) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
};

export const RedirectLogin = ({ children, redirectTo = "/login",}) => {
  
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={redirectTo} />;
  }
  return <Outlet />;
};

