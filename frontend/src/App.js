import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage"; // <-- Import HomePage
import LoginRegister from "./components/auth/LoginRegister";
import StudentDashboard from "./components/student/StudentDashboard";
import TeacherDashboard from "./components/teacher/TeacherDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* HomePage as default */}
        <Route path="/loginregister" element={<LoginRegister />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/student-dashboard/*" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard/*" element={<TeacherDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
