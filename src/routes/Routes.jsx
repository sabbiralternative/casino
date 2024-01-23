import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Main from "../layout/Main";
import DiamondCasino from "../pages/DiamondCasino/DiamondCasino";


const router = createBrowserRouter(
  [
    {
      path: "/:tokenId",
      element: <Main />,
      children: [
        {
          path: "/:tokenId",
          element: <Home />,
        },
        {
          path:'/:tokenId/:eventId',
          element:<DiamondCasino/>
        }
      ],
    },
  ],
  {
    basename: '',
  }
);

export default router;
