import { useState,useEffect} from "react";
import axios from "axios";
import "./styles.css";
import todoLogo from "./assets/todo-logo.png";
const API_URL = "http://localhost:5000/api/todos";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  useEffect(()=>{
    axios.get(API_URL)
      .then((response)=>setTasks(response.data))
      .then((error)=>console.log(error));
  },[]);

  const addTask = () => {
    if (!taskText.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: taskText, completed: false }]);
    setTaskText("");
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="container">
      <img src={todoLogo} alt="Todo Logo" className="logo" />
      <h1 className="title">Todo App</h1>

      <div className="input-group">
      
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter task..."
        />
        <button onClick={addTask} className="add-btn">Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : "task-item"}>
            <span>{task.text}</span>
            <button onClick={() => toggleComplete(task.id)} className="complete-btn">
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => editTask(task.id, prompt("Edit task:", task.text))} className="edit-btn">Edit</button>
            <button onClick={() => deleteTask(task.id)} className="delete-btn">X</button>
          </li>
        ))}
      </ul>
    </div>
    
  );
};

export default App;
