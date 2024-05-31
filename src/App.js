import { useEffect, useState } from 'react';
import './App.css';
import CompletedList from './components/CompletedList';
import PendingList from './components/PendingList';
import ProgressList from './components/ProgressList';

import axios from 'axios';

function App() {

const [pendingList, setPendingList] = useState([]);
const [progressList, setProgressList] = useState([]);
const [completedList, setCompletedList] = useState([]);

useEffect(() => {
    fetchTasks();
}, []);

const fetchTasks = async () => {
  try {
      
      const response = await axios.get('http://localhost:5000/tasks');
      const tasks = response.data.data;

      const pending = tasks.filter(task => task.isPending);
      const progress = tasks.filter(task => task.isProgress);
      const completed = tasks.filter(task => task.isCompleted);

      setPendingList(pending);
      setProgressList(progress);
      setCompletedList(completed);
  } catch (error) {
      console.error("Error fetching tasks", error);
  }
};

// console.log(pendingList)

  return (
    <>
      <div className='App'>
        <h2>Dynamic to-do</h2>
      </div>
    <div style={{ display: 'flex' }}>
      <div className='pending-section'>
        <PendingList
          pendingList={pendingList}
          fetchTasks={fetchTasks}
        />
      </div>
      <div className='progress-section'>
        <ProgressList
          progressList={progressList}
          fetchTasks={fetchTasks}
        />
      </div>
      <div className='completed-section'>
        <CompletedList
          completedList={completedList}
          fetchTasks={fetchTasks}
        />
      </div>
    </div>
    </>
  );
}

export default App;