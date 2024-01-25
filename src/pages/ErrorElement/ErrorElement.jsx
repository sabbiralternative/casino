import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ErrorElement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const eventId = path.split("/").filter(Boolean)[1];
  useEffect(() => {
    navigate(eventId);
  }, []);

  return <div></div>;
};

export default ErrorElement;
