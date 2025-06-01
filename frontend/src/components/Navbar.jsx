import React from 'react';
import './Navbar.css';
import { FaBell } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="navbar">
      <input type="text" placeholder="Search..." className="search" />
      <div className="right">
        <FaBell className="icon" />
        <img src="https://via.placeholder.com/40" alt="Profile" className="avatar" />
        <span className="username">John Doe</span>
      </div>
    </div>
  );
};

export default Navbar;
