import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { SpinnerIcon } from "../assets/Icons";

export const ProtectedRoute = ({
  children,
  loading,
  isForUser,
  user,
  redirectTo,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SpinnerIcon />
      </div>
    );
  }

  if ((isForUser && !user) || (!isForUser && user)) {
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool.isRequired,
  isForUser: PropTypes.bool.isRequired,
  user: PropTypes.object,
  redirectTo: PropTypes.string,
};

ProtectedRoute.defaultProps = {
  redirectTo: "/",
};
