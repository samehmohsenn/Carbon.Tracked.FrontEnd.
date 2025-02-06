import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DataEntryPage from "./pages/DataEntryPage";
import ReportPage from "./pages/ReportPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/data-entry" element={<DataEntryPage />} />
        <Route path="/reports" element={<ReportPage />} />
      </Routes>
    </Router>
  );
};

export default App;
