import React from "react";
import "./StudentDashboard.css";
import { Routes, Route, Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaCalendarAlt,
  FaComments,
  FaBook,
  FaStickyNote,
  FaCog,
  FaFileAlt,
  FaPenFancy,
  FaBell,
} from "react-icons/fa";

import ExamInstructions from "./ExamInstructions";
import TakeExam from "./TakeExam";
import StudentResults from "./StudentResults";

const DashboardHome = () => (
  <div className="content">
    <h2>Welcome to the Student Dashboard</h2>
  </div>
);

const menuItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, path: "" },
  { label: "Assignments", icon: <FaClipboardList />, path: "assignments" },
  { label: "Schedule", icon: <FaCalendarAlt />, path: "schedule" },
  { label: "Results", icon: <FaFileAlt />, path: "results" },
  { label: "Exam", icon: <FaPenFancy />, path: "exam-instructions" },
  { label: "Discussions", icon: <FaComments />, path: "discussions" },
  { label: "Resources", icon: <FaBook />, path: "resources" },
  { label: "Notes", icon: <FaStickyNote />, path: "notes" },
  { label: "Courses", icon: <FaBook />, path: "courses" },
  { label: "Settings", icon: <FaCog />, path: "settings" },
];

const StudentDashboard = () => {
  const username = localStorage.getItem("username") || "Student";

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Student</h2>
        <ul className="menu">
          {menuItems.map((item, index) => (
            <li key={index} className="menu-item">
              {item.path !== undefined ? (
                <Link
                  to={
                    item.path === ""
                      ? "/student-dashboard"
                      : `/student-dashboard/${item.path}`
                  }
                  className="link"
                >
                  <span className="icon">{item.icon}</span>
                  <span className="label">{item.label}</span>
                </Link>
              ) : (
                <div className="link no-link">
                  <span className="icon">{item.icon}</span>
                  <span className="label">{item.label}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Layout */}
      <div className="main-content">
        <div className="navbar">
          <input type="text" placeholder="Search..." className="search" />
          <div className="right">
            <FaBell className="icon" />
            <img src="https://via.placeholder.com/40" alt="Profile" className="avatar" />
            <span className="username">{username}</span>
          </div>
        </div>

        {/* Routing Content */}
        <div className="content">
          <Routes>
            <Route path="/" element={<DashboardHome key={window.location.pathname} />} />
            <Route path="exam-instructions" element={<ExamInstructions key={window.location.pathname} />} />
            <Route path="take-exam" element={<TakeExam key={window.location.pathname} />} />
            <Route path="results" element={<StudentResults key={window.location.pathname} />} />
            {/* Add more routes with keys here if needed */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
