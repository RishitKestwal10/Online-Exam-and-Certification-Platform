import React from "react";
import "./TeacherDashboard.css";
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
const DashboardHome = () => (
  <div className="content">
    <h2>Welcome to the Teacher Dashboard</h2>
    <div className="dashboard-section">
      <TodoList />
    </div>
  </div>
);

const menuItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, path: "" },
  { label: "Assignments", icon: <FaClipboardList />, path: "assignments" },
  { label: "Schedule", icon: <FaCalendarAlt />, path: "schedule" },
  { label: "Results", icon: <FaFileAlt />, path: "results" },
  { label: "Create Exam", icon: <FaPenFancy />, path: "create_exam" },
  { label: "Discussions", icon: <FaComments />, path: "discussions" },
  { label: "Resources", icon: <FaBook />, path: "resources" },
  { label: "Notes", icon: <FaStickyNote />, path: "notes" },
  { label: "Courses", icon: <FaBook />, path: "courses" },
  { label: "Settings", icon: <FaCog />, path: "settings" },
];

const TeacherDashboard = () => {
  const username = localStorage.getItem("username") || "Teacher";

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Teacher</h2>
        <ul className="menu">
          {menuItems.map((item, index) => (
            <li key={index} className="menu-item">
              {item.path !== undefined ? (
                <Link
                  to={
                    item.path === ""
                      ? "/teacher-dashboard"
                      : `/teacher-dashboard/${item.path}`
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
            <Route path="assignments" element={<AddAssignment key={window.location.pathname} />} />
            <Route path="courses" element={<CourseOverview key={window.location.pathname} />} />
            <Route path="courses/add" element={<AddCourse key={window.location.pathname} />} />
            <Route path="courses/my" element={<MyCourses key={window.location.pathname} />} />
            <Route path="courses/enrolled" element={<StudentEnrollment key={window.location.pathname} />} />
            <Route path="create_exam" element={<CreateExam key={window.location.pathname} />} />
            <Route path="create_exam/mcq-exam-form" element={<MCQExamForm key={window.location.pathname} />} />
            <Route path="mcq-form" element={<MCQForm key={window.location.pathname} />} />
             <Route path="results" element={<TeacherResults key={window.location.pathname}/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
