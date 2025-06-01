import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AddCourse from './components/AddCourse';
import MyCourses from './components/MyCourses';
import StudentEnrollment from './components/StudentEnrollment';
import CourseOverview from './components/CourseOverview';
import CreateExam from './components/CreateExam';
import CourseExam from './components/CourseExam';
import MCQForm from './components/MCQForm';
import TeacherDashboard from './components/TeacherDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <div className="main-layout">
          <Navbar />
          <div className="content">
            <Routes>
              {/* ✅ Render TeacherDashboard on home route */}
              <Route path="/" element={<TeacherDashboard />} />

              {/* Other routes */}
              <Route path="/courses" element={<CourseOverview />} />
              <Route path="/courses/add" element={<AddCourse />} />
              <Route path="/courses/my" element={<MyCourses />} />
              <Route path="/courses/enrolled" element={<StudentEnrollment />} />
              <Route path="/create_exam" element={<CreateExam />} />
              <Route path="/course-exam" element={<CourseExam />} />
              <Route path="/mcqform" element={<MCQForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
