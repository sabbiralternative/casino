import { createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home/Home";
import Main from "../layout/Main";
import DiamondCasino from "../pages/DiamondCasino/DiamondCasino";
import ErrorElement from '../pages/ErrorElement/ErrorElement'

// const DiamondCasinoWrapper = () => {
//   const location = useLocation();
//   const textAfterBaseUrl = location.pathname.substring(1);
//   return textAfterBaseUrl.length <= 30 ? <DiamondCasino /> : null;
// };

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement:<ErrorElement/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:eventId",
        element: <DiamondCasino/>,
      },
    ],
  },
]);

export default router;
