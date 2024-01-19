import React, { Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ReactDOM from "react-dom/client";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NavBar from "./components/Navbar";
import { AlertPopup } from "./components/AlertPopup";
import { MainContext } from "./components/MainContext";

import "./index.css";
import Detail from "./pages/Detail";
import LoadingContainer from "./components/LoadingContainer";


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />
//   },
//   {
//     path: "/create",
//     element: <CreatePage />
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AlertPopup>
      <BrowserRouter>
        <MainContext>
          <NavBar />
          <Suspense fallback={<LoadingContainer isFullHeight={true} />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:id" element={<Detail />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Suspense>
          {/* <RouterProvider router={router} fallbackElement={<LoadingContainer isFullHeight={true} />} /> */}
        </MainContext>
      </BrowserRouter>
    </AlertPopup>
  </React.StrictMode>
);
