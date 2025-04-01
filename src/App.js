import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const location = useLocation();  // useLocation hook to track route changes
  useEffect(() => {
    // Initialize Google Analytics
    ReactGA.initialize('G-M8E6Z3NGZV'); // Replace with your GA Measurement ID

    // Track page views whenever the location changes (i.e., whenever route changes)
    ReactGA.send('pageview', location.pathname + location.search);
  }, [location]);  // This hook runs whenever location changes (on route change)
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export function ProtectedRoutes(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
