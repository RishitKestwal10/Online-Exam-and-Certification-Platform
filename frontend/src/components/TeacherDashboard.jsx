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
  FaBell
} from "react-icons/fa";

// Page Components
import AddCourse from "./AddCourse";
import MyCourses from "./MyCourses";
import StudentEnrollment from "./StudentEnrollment";
import CourseOverview from "./CourseOverview";
import CreateExam from "./CreateExam";
import CourseExam from "./CourseExam";
import MCQForm from "./MCQForm";
import MCQExamForm from "./MCQExamForm";
import AddAssignment from "./AddAssignment";
import TodoList from "./TodoList"; // ✅ To-Do List imported

// ✅ Dashboard Home Component
const DashboardHome = () => (
  <div className="content">
    <h2>Welcome to the Teacher Dashboard</h2>
    <p>Select an option from the sidebar to get started.</p>

    <div className="dashboard-section">
      <h3>Your Tasks</h3>
      <TodoList />
    </div>
  </div>
);

// ✅ Sidebar Menu Items (To-Do List removed from here)
const menuItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, path: "/" },
  { label: "Assignments", icon: <FaClipboardList />, path: "/assignments" },
  { label: "Schedule", icon: <FaCalendarAlt /> },
  { label: "Results", icon: <FaFileAlt /> },
  { label: "Create Exam", icon: <FaPenFancy />, path: "/create_exam" },
  { label: "Discussions", icon: <FaComments /> },
  { label: "Resources", icon: <FaBook /> },
  { label: "Notes", icon: <FaStickyNote /> },
  { label: "Courses", icon: <FaBook />, path: "/courses" },
  { label: "Settings", icon: <FaCog /> }
];

const TeacherDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Teacher</h2>
        <ul className="menu">
          {menuItems.map((item, index) => (
            <li key={index} className="menu-item">
              {item.path ? (
                <Link to={item.path} className="link">
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
        {/* Navbar */}
        <div className="navbar">
          <input type="text" placeholder="Search..." className="search" />
          <div className="right">
            <FaBell className="icon" />
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="avatar"
            />
            <span className="username">John Doe</span>
          </div>
        </div>

        {/* Routing Content */}
        <div className="content">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/assignments" element={<AddAssignment />} />
            <Route path="/courses" element={<CourseOverview />} />
            <Route path="/courses/add" element={<AddCourse />} />
            <Route path="/courses/my" element={<MyCourses />} />
            <Route path="/courses/enrolled" element={<StudentEnrollment />} />
            <Route path="/create_exam" element={<CreateExam />} />
            <Route path="/course-exam" element={<CourseExam />} />
            <Route path="/mcq-form" element={<MCQForm />} />
            <Route path="/mcq-exam-form" element={<MCQExamForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
