import { createBrowserRouter, useLocation } from "react-router-dom";
import Home from "../pages/Home/Home";
import Main from "../layout/Main";
import DiamondCasino from "../pages/DiamondCasino/DiamondCasino";

const DiamondCasinoWrapper = () => {
  const location = useLocation();
  const textAfterBaseUrl = location.pathname.substring(1);
  return textAfterBaseUrl.length <= 30 ? <DiamondCasino /> : null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:eventId",
        element: <DiamondCasinoWrapper />,
      },
    ],
  },
]);

export default router;
