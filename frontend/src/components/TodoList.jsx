
import React, { useState } from "react";
import "./TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const deleteTodo = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  return (
    <div className="todo-card">
      <h2 className="todo-title">📝 To-Do List</h2>
      <div className="todo-input-group">
        <input
          type="text"
          value={input}
          placeholder="Add a task..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          className="todo-input"
        />
        <button onClick={addTodo} className="todo-add-button">
          Add
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <span
              onClick={() => toggleComplete(index)}
              className={`todo-text ${todo.completed ? "completed" : ""}`}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(index)} className="todo-delete">
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
