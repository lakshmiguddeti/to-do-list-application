import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file

const App = () => {
  const [item, setItem] = useState([]);
  const [newtask, setNewtask] = useState('');

  useEffect(() => {
    axios.get("http://localhost:5000/gettask").then(
      arr => setItem(arr.data)
    )
  }, []);

  const submitHandler = e => {
    e.preventDefault();
    axios.post("http://localhost:5000/addtask", { todo: newtask }).then(
      arr => setItem(arr.data)
    )
    setNewtask(''); // Clear input field after submission
  }

  const deleteHandler = id => {
    axios.delete(`http://localhost:5000/delete/${id}`).then(
      arr => setItem(arr.data)
    )
  }

  return (
    <div className="app-container">
      <center>
        <h1>To-Do List</h1>
        <form onSubmit={submitHandler}>
          <input 
            type="text" 
            value={newtask}
            onChange={(e) => setNewtask(e.target.value)}
            placeholder="Enter a new task" 
          />
          <button id="add" type="submit">Add Task</button>
        </form>
        <div className="task-list">
          {item.map(task =>
            <div className="task-item" key={task._id}>
              <h2>{task.todo}</h2>
              <button onClick={() => deleteHandler(task._id)}>Remove Task</button>
            </div>
          )}
        </div>
      </center>
    </div>
  )
}

export default App;