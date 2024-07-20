import { Navigate } from "react-router-dom";
import useBoundStore from "../store/Store";
import React from "react";

const ProtectedRoute = ({ isAllowed, redirectPath = "/login", children }) => {
  const { user } = useBoundStore((state) => state);

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return React.cloneElement(children, { user });
};

export default ProtectedRoute;
