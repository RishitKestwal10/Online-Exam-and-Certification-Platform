import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaClipboardList,
  FaCalendarAlt,
  FaComments,
  FaBook,
  FaStickyNote,
  FaCog,
  FaFileAlt,
  FaPenFancy
} from 'react-icons/fa';

const menuItems = [
  { label: 'Dashboard', icon: <FaTachometerAlt />, path: '/' },
  { label: 'Assignments', icon: <FaClipboardList /> },
  { label: 'Schedule', icon: <FaCalendarAlt /> },
  { label: 'Results', icon: <FaFileAlt /> },
  { label: 'Create Exam', icon: <FaPenFancy />, path: '/create_exam' },
  { label: 'Discussions', icon: <FaComments /> },
  { label: 'Resources', icon: <FaBook /> },
  { label: 'Notes', icon: <FaStickyNote /> },
  { label: 'Courses', icon: <FaBook />, path: '/courses' },
  { label: 'Settings', icon: <FaCog /> },
];

const Sidebar = () => {
  return (
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
  );
};

export default Sidebar;
