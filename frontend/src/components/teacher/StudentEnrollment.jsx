import React from 'react';
import './StudentEnrollment.css';

const students = [
  {
    id: 1,
    name: 'Richard Sanford',
    course: 'Build Text to image SaaS App in React JS',
    date: '22 Aug, 2024',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    name: 'Enrique Murphy',
    course: 'Build AI BG Removal SaaS App in React JS',
    date: '22 Aug, 2024',
    avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
  },
  {
    id: 3,
    name: 'Alison Powell',
    course: 'React Router Complete Course in One Video',
    date: '25 Sep, 2024',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 4,
    name: 'Richard Sanford',
    course: 'Build Full Stack E-Commerce  App in React JS',
    date: '15 Oct, 2024',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 5,
    name: 'Enrique Murphy',
    course: 'Build AI BG Removal SaaS App in React JS',
    date: '22 Aug, 2024',
    avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
  },
  {
    id: 6,
    name: 'Alison Powell',
    course: 'React Router Complete Course in One Video',
    date: '25 Sep, 2024',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 7,
    name: 'Richard Sanford',
    course: 'Build Full Stack E-Commerce  App in React JS',
    date: '15 Oct, 2024',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

const StudentEnrollment = () => {
  return (
    <div className="enrollment-container">
  <h2>Student Enrollments</h2>
  <div className="enrollment-scroll-wrapper">
    <table className="enrollment-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Student name</th>
          <th>Course Title</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={student.id}>
            <td>{index + 1}</td>
            <td className="student-name">
              <img src={student.avatar} alt={student.name} />
              <span>{student.name}</span>
            </td>
            <td>{student.course}</td>
            <td>{student.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default StudentEnrollment;
