import React from 'react';
import TodoList from './TodoList'; 

function TeacherDashboard() {
  return (
    <div className="dashboard-container">
      <h1>Welcome to Teacher Dashboard</h1>
      <TodoList />
    </div>
  );
}

export default TeacherDashboard;
