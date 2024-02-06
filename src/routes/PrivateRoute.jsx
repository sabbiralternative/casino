import useContextState from "../hooks/useContextState";
import Loader from "../components/Loader/Loader";
import SessionExpire from "../components/SessionExpire/SessionExpire";

const PrivateRoute = ({ children }) => {
  const { token, loading } = useContextState();
  if (loading) {
    return <Loader />;
  }
  else if (token) {
    return children;
  }
  return <SessionExpire />;
};

export default PrivateRoute;
