import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRegister from "./components/auth/LoginRegister";
import StudentDashboard from "./components/student/StudentDashboard";
import TeacherDashboard from "./components/teacher/TeacherDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/student-dashboard/*" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard/*" element={<TeacherDashboard />} />
        <Route path="/loginregister" element={<LoginRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
