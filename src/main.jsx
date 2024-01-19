import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import CreatePage from './pages/Create';
import Home from './pages/Home';
import NavBar from './components/Navbar';
import { MainContext } from './components/MainContext';
import { AlertPopup } from './components/AlertPopup';
import Login from './pages/Login';

import './index.css';
import LoadingContainer from './components/LoadingContainer';

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AlertPopup>
      <BrowserRouter>
        <MainContext>
          <NavBar />
          <Suspense fallback={<LoadingContainer isFullHeight={true} />}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/:id' element={<CreatePage isFromDetail />} />
              <Route path='/login' element={<Login isFromDetail />} />
            </Routes>
          </Suspense>
          {/* <RouterProvider router={router} fallbackElement={<LoadingContainer isFullHeight={true} />} /> */}
        </MainContext>
      </BrowserRouter>
    </AlertPopup>
  </React.StrictMode>,
)
