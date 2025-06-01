import React, { useState } from 'react';
import './TodoList.css'; 

function TodoList() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([
    'Prepare assignment',
    'Review exam results',
    'Update course materials'
  ]);

  const handleAdd = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, task]);
    setTask('');
  };

  const handleDelete = (index) => { 
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="todo-container">
      <h2>📝 To-Do List</h2>
      <div className="input-group">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((t, i) => (
          <li key={i}>
            {t}
            <span onClick={() => handleDelete(i)} className="delete-btn">✖</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
