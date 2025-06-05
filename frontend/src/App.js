import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

// Dashboard
import TeacherDashboard from "./components/TeacherDashboard";

// Course Management
import AddCourse from "./components/AddCourse";
import MyCourses from "./components/MyCourses";
import StudentEnrollment from "./components/StudentEnrollment";
import CourseOverview from "./components/CourseOverview";

// Exam Management
import CreateExam from "./components/CreateExam";
import CourseExam from "./components/CourseExam";
import MCQForm from "./components/MCQForm";
import MCQExamForm from "./components/MCQExamForm";

// Assignments
import AddAssignment from "./components/AddAssignment";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-layout">
        {/* Sidebar navigation */}
        <Sidebar />

        <div className="main-layout">
          {/* Top navigation */}
          <Navbar />

          {/* Page Content */}
          <div className="content">
            <Routes>
              {/* Default Dashboard */}
              <Route path="/" element={<TeacherDashboard />} />

              {/* Course Management */}
              <Route path="/courses" element={<CourseOverview />} />
              <Route path="/courses/add" element={<AddCourse />} />
              <Route path="/courses/my" element={<MyCourses />} />
              <Route path="/courses/enrolled" element={<StudentEnrollment />} />

              {/* Exam Management */}
              <Route path="/create_exam" element={<CreateExam />} />
              <Route path="/course-exam" element={<CourseExam />} />
              <Route path="/mcq-form" element={<MCQForm />} />
              <Route path="/mcq-exam-form" element={<MCQExamForm />} />
              {/* Assignments */}
              <Route path="/assignments" element={<AddAssignment />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
