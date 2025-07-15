import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = useSelector((state) => state.app.token);
    const location = useLocation();

    if (!token || token === "null" || token === "undefined") {
        console.warn("🔒 No valid token, redirecting to /login");
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
