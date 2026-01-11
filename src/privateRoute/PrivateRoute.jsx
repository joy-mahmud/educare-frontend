import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ allowedRoles, allowedUserTypes, children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Not logged in → choose user type
  if (!user) {
    return (
      <Navigate to="/select-user" state={{ from: location.pathname }} replace />
    );
  }

  // User type check (student / teacher)
  if (allowedUserTypes && !allowedUserTypes.includes(user.user_type)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Teacher role check
  if (
    user.user_type === "teacher" &&
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
