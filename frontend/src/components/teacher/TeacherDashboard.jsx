import React from "react";
import "./TeacherDashboard.css";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaBook,
  FaFileAlt,
  FaPenFancy,
  FaBell,
  FaUserGraduate,
  FaCertificate,
  FaRegClipboard
} from "react-icons/fa";

// Import your other pages/components
import AddCourse from "./AddCourse";
import MyCourses from "./MyCourses";
import StudentEnrollment from "./StudentEnrollment";
import CourseOverview from "./CourseOverview";
import CreateExam from "./CreateExam";
import MCQForm from "./MCQForm";
import MCQExamForm from "./MCQExamForm";
import AddAssignment from "./AddAssignment";
import TodoList from "./TodoList";
import TeacherResults from "./TeacherResults";
import CodingForm from "./CodingForm";

const DashboardHome = () => {
  const navigate = useNavigate();

  return (
    <div className="teacher-content">
      <div className="teacher-welcome-banner">
        <h2>Welcome back, Teacher 👋</h2>
        <p>Manage your courses, track student progress, and create engaging exams.</p>
        <button className="teacher-create-btn" onClick={() => navigate("/teacher-dashboard/courses/add")}>
          + Create New Course
        </button>
      </div>

      <div className="teacher-dashboard-widgets">
        <div className="teacher-widget-box widget-courses">
          <FaBook className="widget-icon" />
          <h3>Total Courses</h3>
          <p>5</p>
        </div>
        <div className="teacher-widget-box widget-students">
          <FaUserGraduate className="widget-icon" />
          <h3>Active Students</h3>
          <p>128</p>
        </div>
        <div className="teacher-widget-box widget-exams">
          <FaRegClipboard className="widget-icon" />
          <h3>Exams Created</h3>
          <p>12</p>
        </div>
        <div className="teacher-widget-box widget-certificates">
          <FaCertificate className="widget-icon" />
          <h3>Certificates Issued</h3>
          <p>36</p>
        </div>
      </div>

      <div className="teacher-quick-actions">
        <h3>Quick Actions</h3>
        <div className="quick-actions-grid">
          <button className="teacher-quick-btn blue" onClick={() => navigate("/teacher-dashboard/create_exam/mcq-exam-form")}>
            <FaRegClipboard /> Create MCQ Exam
          </button>
          <button className="teacher-quick-btn green" onClick={() => navigate("/teacher-dashboard/create_exam/coding-exam")}>
            <FaPenFancy /> Create Coding Exam
          </button>
          <button className="teacher-quick-btn yellow" onClick={() => navigate("/teacher-dashboard/courses/add")}>
            <FaBook /> Create Course
          </button>
        </div>
      </div>
    </div>
  );
};

const menuItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, path: "" },
  { label: "Assignments", icon: <FaClipboardList />, path: "assignments" },
  { label: "Create Exam", icon: <FaPenFancy />, path: "create_exam" },
  { label: "Results", icon: <FaFileAlt />, path: "results" },
  { label: "Courses", icon: <FaBook />, path: "courses" },
];

const TeacherDashboard = () => {
  const username = localStorage.getItem("username") || "Teacher";
  const navigate = useNavigate();

  return (
    <div className="teacher-dashboard-container">
      <div className="teacher-sidebar">
        <div className="teacher-sidebar-logo">
          <img src="/images/Examplus.png" alt="ExamPlus Logo" className="teacher-sidebar-logo-img" />
          <span className="teacher-sidebar-app-name">ExamPlus</span>
        </div>
        <div className="teacher-account-btn">Teacher Account</div>
        <ul className="teacher-menu">
          {menuItems.map((item, index) => (
            <li key={index} className="teacher-menu-item">
              <NavLink
                to={item.path === "" ? "/teacher-dashboard" : `/teacher-dashboard/${item.path}`}
                end={item.path === ""}
                className={({ isActive }) => `link ${isActive ? "active" : ""}`}
                title={item.label}
              >
                <span className="teacher-icon">{item.icon}</span>
                <span className="teacher-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="teacher-main-content">
        {/* Topbar */}
        <div className="teacher-topbar">
          <div className="teacher-topbar-left"></div>
          <div className="teacher-topbar-right">
            <div className="notification-bell" title="Notifications">
              <FaBell className="teacher-icon" />
              <span className="notify-dot"></span>
            </div>
            <img src="https://via.placeholder.com/40" alt="Profile" className="teacher-avatar" />
            <span className="teacher-username">{username}</span>
            <button
              className="teacher-logout-btn"
              onClick={() => {
                if (window.confirm("Are you sure you want to logout?")) {
                  localStorage.clear();
                  navigate("/loginregister");
                }
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="teacher-content">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="assignments" element={<AddAssignment />} />
            <Route path="courses" element={<CourseOverview />} />
            <Route path="courses/add" element={<AddCourse />} />
            <Route path="courses/my" element={<MyCourses />} />
            <Route path="courses/enrolled" element={<StudentEnrollment />} />
            <Route path="create_exam" element={<CreateExam />} />
            <Route path="create_exam/mcq-exam-form" element={<MCQExamForm />} />
            <Route path="mcq-form" element={<MCQForm />} />
            <Route path="create_exam/coding-exam" element={<CodingForm />} />
            <Route path="results" element={<TeacherResults />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
