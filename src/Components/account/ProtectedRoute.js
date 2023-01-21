import { UserAuth } from "../../Contexts/AuthContext";
import { useEffect } from "react";
import { Navigate } from "react-router";

const ProtectedRoute = (props) => {
  const { user } = UserAuth();
  const { children, handleUnauthorizedAccess, snackbarOpen } = props;

  useEffect(() => {
    if (!user) {
      handleUnauthorizedAccess();
    }
  }, [snackbarOpen])

  if (!user) {
    return <Navigate to="/" />
  } else {
    return children;
  }
}

export default ProtectedRoute;
