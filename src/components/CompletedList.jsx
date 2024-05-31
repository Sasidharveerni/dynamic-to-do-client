import axios from 'axios';
import React, { useState } from 'react'
import Loader from './Loader';

function CompletedList({ completedList, fetchTasks }) {

  const [loading, setLoading] = useState(false); // Loader state
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
    <div className='pending-todo'>
      <p>DONE ✔️</p>

      {loading && <Loader />}
      {completedList && completedList.map((task, ind) => (
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
              <p>
                Completed at : {task.timestamp}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CompletedList