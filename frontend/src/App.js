import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

// All-in-One Dashboard Layout Component
import TeacherDashboard from "./components/TeacherDashboard";

// Global Styles
import "./components/TeacherDashboard.css";


function App() {
  return (
    <Router>
      <TeacherDashboard />
    </Router>
  );
}

export default App;
