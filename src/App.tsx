import React, { useRef } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';

import Navbar from './components/compressimage/Navbar'
import CompressImage from './CompressImage'
import AboutSection from './components/landing/AboutSection'
import FeatureSection from './components/landing/FeatureSection'
import IntroSection from './components/landing/IntroSection'
import { VITE_APP_DEBUG } from './api/secrets'
import SideNotification from './components/sidenotification/SideNotification'
import useNotification from './hooks/useNotification'
import LayoutOutlet from './components/layout/LayoutOutlet';
import HomePage from './components/pages/HomePage';
import ErrorPage from './components/error/ErrorPage';

if (!VITE_APP_DEBUG) {
  console.log = () => { };
  console.info = () => { };
  console.warn = () => { };
  console.error = () => { };
  console.debug = () => { };
}

// IntroSection.tsx

const App = () => {

  return (
    <BrowserRouter>
      {/* <ScrollToTopOnMount /> */}
      {/* <AppRoutes routesList={routeList} /> */}
      <Routes>
        <Route element={<LayoutOutlet />}>
           <Route path='/' element={<HomePage />} />

           <Route path="/error" element={<ErrorPage />} />
           <Route element={<ErrorPage />} />
           <Route path='*' element={<Navigate replace to="/error" />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App