
import { BrowserRouter, Route, Routes, createBrowserRouter } from "react-router-dom";

import Coins from "./routes/Coins";
import NoddataCoin from "./routes/NodataCoin";
import App from "./App";
import Coin from "./routes/Coin";
import Chart from "./routes/Chart";
import Price from "./routes/Price";
const router = createBrowserRouter([
  {
    path:`/`, 
    element: <App />,
    children: [
      {
        path: "",
        element:<Coins />,
      },
      {
        path: "no-data",
        element:<NoddataCoin />,
      },
      {
        path: ":coinId",
        element:<Coin />,
        children: [
          {
            path: "price",
            element:<Price/>,
          },
          {
            path: "chart",
            element:<Chart/>,
          }
        ]
      }
    ]
  }
],
{
  basename: "/crypto-tracker", // GitHub Pages에서의 기본 경로 설정
}
);

export default router