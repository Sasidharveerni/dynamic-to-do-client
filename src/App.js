import { useEffect, useState } from 'react';
import './App.css';
import CompletedList from './components/CompletedList';
import PendingList from './components/PendingList';
import ProgressList from './components/ProgressList';

import axios from 'axios';

function App() {

const [pendingList, setPendingList] = useState([]); // For all pending tasks we can store in the state handler and iterate in PendingTask Section
const [progressList, setProgressList] = useState([]); // For all ongoing tasks we can store in the progress state handler and iterate in ProgressTask Section
const [completedList, setCompletedList] = useState([]); // For all completed tasks we can store in the completedList state handler and iterate in completedList Section

useEffect(() => {
    fetchTasks();
}, []);

const fetchTasks = async () => {
  try {
      
      const response = await axios.get('https://dynamic-to-do-server.onrender.com/tasks'); // We fetch the data from backend by using axios.get() method.
      const tasks = response.data.data;     

      const pending = tasks.filter(task => task.isPending);  
      const progress = tasks.filter(task => task.isProgress);    // We divide the tasks into 3 sections : Pending, Progress, Completed based on the response of backend server we store them respectively.
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
          pendingList={pendingList}         // We will send the state-handlers as props to iterate and display the data.
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