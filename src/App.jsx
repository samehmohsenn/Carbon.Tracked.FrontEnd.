import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DataEntryPage from "./pages/DataEntryPage";
import ReportPage from "./pages/ReportPage";
import HomePage from "./components/HomePage";
import Logout from "./components/Logout";
import Header from "./components/Header";

const AppContent = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/signup' && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/data-entry" element={<DataEntryPage />} />
        <Route path="/reports" element={<ReportPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
