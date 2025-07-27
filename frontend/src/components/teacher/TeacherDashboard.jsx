import React from "react";
import "./TeacherDashboard.css";
import { Routes, Route, NavLink,useNavigate } from "react-router-dom";
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

const DashboardHome = () => {
  const navigate = useNavigate();

  return (
    <div className="content">
      {/* Welcome Section */}
      <div className="welcome-banner">
        <h2>Welcome back, Teacher 👋</h2>
        <p>Manage your courses, track student progress, and create engaging exams.</p>
        <button className="create-btn" onClick={() => navigate("/teacher-dashboard/courses/add")}>
          + Create New Course
        </button>
      </div>

      {/* Dashboard Metrics */}
      <div className="dashboard-widgets">
        <div className="widget-box">
          <h3>Total Courses</h3>
          <p>5</p>
        </div>
        <div className="widget-box">
          <h3>Active Students</h3>
          <p>128</p>
        </div>
        <div className="widget-box">
          <h3>Exams Created</h3>
          <p>12</p>
        </div>
        <div className="widget-box">
          <h3>Certificates Issued</h3>
          <p>36</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <button className="quick-btn blue" onClick={() => navigate("/teacher-dashboard/create_exam/mcq-exam-form")}>
          + Create MCQ Exam
        </button>
        <button className="quick-btn green" onClick={() => navigate("/teacher-dashboard/create_exam")}>
          + Create Coding Exam
        </button>
        <button className="quick-btn yellow" onClick={() => navigate("/teacher-dashboard/courses/add")}>
          + Create Course
        </button>
      </div>
    </div>
  );
};

const menuItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, path: "" },
  { label: "Assignments", icon: <FaClipboardList />, path: "assignments" },
  //{ label: "Schedule", icon: <FaCalendarAlt />, path: "schedule" },
  { label: "Create Exam", icon: <FaPenFancy />, path: "create_exam" },
  { label: "Results", icon: <FaFileAlt />, path: "results" },
  
 // { label: "Discussions", icon: <FaComments />, path: "discussions" },
  //{ label: "Resources", icon: <FaBook />, path: "resources" },
 // { label: "Notes", icon: <FaStickyNote />, path: "notes" },
  { label: "Courses", icon: <FaBook />, path: "courses" },
 // { label: "Settings", icon: <FaCog />, path: "settings" },
];

const TeacherDashboard = () => {
  const username = localStorage.getItem("username") || "Teacher";
const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-logo">
   <img src="/images/Examplus.png" alt="ExamPlus Logo" className="sidebar-logo-img" />
  <span className="sidebar-app-name">ExamPlus</span>
</div>

        <ul className="menu">
          
          {menuItems.map((item, index) => (
            <li key={index} className="menu-item">
              {item.path !== undefined ? (
   <NavLink
  to={
    item.path === ""
      ? "/teacher-dashboard"
      : `/teacher-dashboard/${item.path}`
  }
  end={item.path === ""} // exact match only for dashboard
  className={({ isActive }) => `link ${isActive ? 'active' : ''}`}
>
  <span className="icon">{item.icon}</span>
  <span className="label">{item.label}</span>
</NavLink>

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
       <div className="topbar">
  <div className="topbar-left">
    <h2 className="app-name"></h2>
  </div>
  <div className="topbar-right">
    <FaBell className="icon" />
    <img src="https://via.placeholder.com/40" alt="Profile" className="avatar" />
    <span className="username">{username}</span>
<button
  className="logout-btn"
  onClick={() => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.clear(); // Clear session
      navigate("/loginregister"); // Go to login/register
    }
  }}
>
  Logout
</button>


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
