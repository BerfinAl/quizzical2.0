import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Landing from "./Landing";
import Game from "./Game";
import GameOver from "./GameOver";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path="/" element={<Landing />} />
      <Route path="game" element={<Game />}  />
      <Route path="gameover" element={<GameOver />} />
    </>
  )
);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
  </>
);
