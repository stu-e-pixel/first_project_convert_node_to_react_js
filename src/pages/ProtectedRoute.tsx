
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

type Role = "admin" | "user";

interface ProtectedRouteProps {
  allowedRole: Role;
}

const getRoleFromToken = (token: string): string | null => {
  try {
    const payload = token.split(".")[1];

    if (!payload) {
      return null;
    }

    const decodedPayload = JSON.parse(
      atob(
        payload
          .replace(/-/g, "+")
          .replace(/_/g, "/")
      )
    );

    return decodedPayload.role || null;
  } catch (error) {
    console.error(
      "Failed to decode access token:",
      error
    );

    return null;
  }
};

const ProtectedRoute = ({
  allowedRole,
}: ProtectedRouteProps) => {
  const token =
    Cookies.get("token") ||
    Cookies.get("accessToken");


  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  const role = getRoleFromToken(token);

  
  if (!role) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (allowedRole === "admin") {
    if (role !== "admin") {
      return (
        <Navigate
          to="/user/home"
          replace
        />
      );
    }

    return <Outlet />;
  }


  if (allowedRole === "user") {
    if (role === "admin" || role === "user") {
      return <Outlet />;
    }

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return (
    <Navigate
      to="/login"
      replace
    />
  );
};

export default ProtectedRoute;
