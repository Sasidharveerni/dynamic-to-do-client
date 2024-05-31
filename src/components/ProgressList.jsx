import axios from "axios";
import Loader from "./Loader";
import { useState } from "react";


function ProgressList({ progressList, fetchTasks }) {

  const [loading, setLoading] = useState(false); // Loader state
  const getFormattedTimestamp = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year}, ${hours}:${minutes}`;  // We return the time string in the given format
  };


  const moveToComplete = async (id) => {
    setLoading(true);
    try {

      // Update the backend
      await axios.patch(`https://dynamic-to-do-server.onrender.com/tasks/${id}`, {
        isCompleted: true,
        isProgress: false,
        timestamp: getFormattedTimestamp() // Add time stamp
      });


    } catch (error) {
      console.error('Error updating task:', error.response?.data || error.message);
    }

    setLoading(false);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`https://dynamic-to-do-server.onrender.com/tasks/${id}`)
    } catch (error) {
      console.error('Error updating task:', error);
    }
    setLoading(false);
    fetchTasks();
  }



  return (
    progressList &&
    <div className='pending-todo'>
      <p>IN PROGRESS {progressList.length} ISSUES</p>
      {loading && <Loader />}
      {progressList.map((task, ind) => (
        task.title &&
        <div className="to-do-box" key={task.id}>
          <button style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            width: '6rem',
            float: 'right',
            marginTop: '0.2rem',
            cursor: 'pointer'
          }}
            onClick={() => deleteTask(task._id)}
          >
            <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/filled-trash.png" alt="filled-trash" />
          </button>
          <div style={{ margin: '1rem' }}>
            <p>{task.title}</p>
            <p>{task.description}</p>
            <div className="checkbox-wrapper-1">
              <input id={`example-${task.id}`} className="substituted" type="checkbox" aria-hidden="true" checked />
              <label htmlFor={`example-${task.id}`}>RW {task.id}</label>
              <button
                onClick={() => moveToComplete(task._id)}
                style={{
                  backgroundColor: '#292929',
                  border: '2px solid #292929',
                  color: '#fff',
                  width: '6rem',
                  float: 'right',
                  borderRadius: '2rem',
                  cursor: 'pointer'
                }}
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProgressList;