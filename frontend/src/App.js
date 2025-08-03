import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginRegister from "./components/auth/LoginRegister";
import StudentDashboard from "./components/student/StudentDashboard";
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import Certificate from "./components/student/Certificate";  // ✅ Import Certificate component

// ✅ Wrapper to extract studentId and examId from URL
const CertificateWrapper = () => {
  const { studentId, examId } = useParams();
  return <Certificate studentId={studentId} examId={examId} />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginregister" element={<LoginRegister />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/student-dashboard/*" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard/*" element={<TeacherDashboard />} />

        {/* ✅ Route to display certificate for studentId & examId */}
        <Route path="/certificate/:studentId/:examId" element={<CertificateWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
