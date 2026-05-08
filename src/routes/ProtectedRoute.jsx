// src/routes/ProtectedRoute.jsx

import { Navigate }
from "react-router-dom";

const ProtectedRoute = ({
  children,
}) => {

  const token =
    localStorage.getItem(
      "accessToken"
    );

  // NOT LOGIN
  if (!token) {

    return (
      <Navigate
        to="/student-login"
        replace
      />
    );
  }

  // LOGIN
  return children;
};

export default ProtectedRoute;