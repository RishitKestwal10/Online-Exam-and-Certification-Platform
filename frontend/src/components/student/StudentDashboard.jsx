import React from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";

import {
  FaTachometerAlt,
  FaClipboardList,
  FaPenFancy,
  FaFileAlt,
  FaBook,
} from "react-icons/fa";
import "./StudentDashboard.css";

import ExamInstructions from "./ExamInstructions";
import TakeExam from "./TakeExam";
import StudentResults from "./StudentResults";

// Dashboard content
const DashboardHome = ({ username }) => (
  <div className="dashboard-welcome">
    <div className="welcome-banner">
      <h2>Welcome back, {username}!</h2>
      <p>Continue your learning journey and track your progress.</p>
      <div className="progress-box">
        <span>0%</span>
        <p>Overall Progress</p>
      </div>
    </div>

    <div className="stats-grid">
      <div className="stat-box">
        <span>📘</span>
        <p>Enrolled Courses</p>
        <strong>0</strong>
      </div>
      <div className="stat-box">
        <span>✅</span>
        <p>Completed Exams</p>
        <strong>0</strong>
      </div>
      <div className="stat-box">
        <span>🏷️</span>
        <p>Certificates Earned</p>
        <strong>0</strong>
      </div>
      <div className="stat-box">
        <span>⏰</span>
        <p>Study Hours</p>
        <strong>0h</strong>
      </div>
    </div>
  </div>
);

const menuItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, path: "" },
  { label: "Assignments", icon: <FaClipboardList />, path: "assignments" },
  { label: "Exam", icon: <FaPenFancy />, path: "exam-instructions" }, 
  { label: "Results", icon: <FaFileAlt />, path: "results" },
  { label: "Courses", icon: <FaBook />, path: "courses" },
];

const StudentDashboard = () => {
  const username = localStorage.getItem("username") || "Demo";
  const location = useLocation();
  const navigate = useNavigate();

  const isExamMode = location.pathname === "/student-dashboard/take-exam";

  if (isExamMode) {
    return (
      <div className="content-only">
        <Routes>
          <Route path="take-exam" element={<TakeExam />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Topbar */}
      <div className="topbar">
        <div className="brand">
          <span className="title">Examify</span>
        </div>
        <div className="user-section">
          <span className="circle-avatar">{username.charAt(0).toUpperCase()}</span>
          <span className="username">{username}</span>
          <button
            className="logout"
            onClick={() => {
              if (window.confirm("Are you sure you want to logout?")) {
                localStorage.clear();
                navigate("/login");
              }
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Layout below topbar */}
      <div className="layout-body">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="account-btn">Student Account</div>
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

        {/* Main content */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<DashboardHome username={username} key={window.location.pathname} />} />
            <Route path="exam-instructions" element={<ExamInstructions key={window.location.pathname} />} />
            <Route path="results" element={<StudentResults key={window.location.pathname} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
