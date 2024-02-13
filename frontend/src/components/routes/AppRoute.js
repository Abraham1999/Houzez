import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "../../context";

export const AppRoutes = ({ component: Component, isPrivate }) => {
  const user = useAuthState();
  return isPrivate && user.token === null ? (
    <Navigate to={{ pathname: "/login" }} />
  ) : (
    <Component />
  );
};

export default AppRoutes;
