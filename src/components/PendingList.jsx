
import React, { useState } from 'react';
import Modal from './Modal';
import axios from 'axios';
import Loader from './Loader';

function PendingList({ pendingList, fetchTasks }) {
    const [note, setNote] = useState({
        ind: 0,
        title: '',
        description: ''
    });

    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(false); // Loader state

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = {
            ind: 0, // Set ind to 0 for new tasks
            title: note.title,
            description: note.description,
            isPending: true,
            isCompleted: false,
            isProgress: false
        };

        setLoading(true);
    
        try {
           await axios.post('https://dynamic-to-do-server.onrender.com/tasks', newTask);  // We post it to the backend by using axios.post() method so for newly created tasks we sent the data to our MongoDataBase and store them.
           setNote({...note, title: '', description: ''})
            
        } catch (error) {
            console.error('Error creating task:', error);
        }
        setLoading(false);
        setShowModal(false);
        fetchTasks(); // By calling fetchTasks() function we update the data each time for each change.
    };


    const moveToProgress = async (id) => {
        setLoading(true);
        try {
            // Send a patch request to update the task's status to in-progress
             await axios.patch(`https://dynamic-to-do-server.onrender.com/tasks/${id}`, { 
                isPending: false,
                isProgress: true,
                isCompleted: false
            });
    
         
        } catch (error) {
            console.error('Error updating task:', error);
        }
        setLoading(false)
        fetchTasks();
    };
    

    const deleteTask = async (id) => {
        try {
            await axios.delete(`https://dynamic-to-do-server.onrender.com/tasks/${id}`) // We delete the task in our database, If User clicks on delete icon.
        } catch (error) {
            console.error('Error updating task:', error);
        }
        fetchTasks();
    }

     
    return (
        <div className='pending-todo'>
            <p>TO DO {pendingList.length} ISSUES</p>
            {loading && <Loader />} {/* We added the loader for usabality of the website so if any action performed by user, since actions are asynchronous. we can show loader meanwhile */}
            {pendingList &&
                pendingList.map((task, ind) => (
                    <div className="to-do-box" key={ind}>
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
                            <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/filled-trash.png" alt="filled-trash"/>
                            </button>
                        <div style={{ margin: '1rem'}}>
                            <p style={{fontSize: '1em'}}>{task.title}</p>
                            <p>{task.description}</p>
                            <div className="checkbox-wrapper-1">
                                <input id={`example-${task.ind}`} className="substituted" type="checkbox" aria-hidden="true" checked/>
                                <label htmlFor={`example-${task.ind}`}>RW</label>
                            <button
                                onClick={() => moveToProgress(task._id)}
                                style={{
                                    backgroundColor: '#292929',
                                    border: '2px solid #292929',
                                    color: '#fff',
                                    width: '6rem',
                                    float: 'right',
                                    borderRadius: '2rem',
                                    cursor: 'pointer'
                                  }}>
                                    Start
                             </button>
                            </div>
                        </div>
                    </div>
                ))}
            <button className='create' onClick={() => setShowModal(true)}>+ Create issue</button>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <form style={{ display: 'flex', margin: '2rem', flexDirection: 'column' }} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Add your task"
                        onChange={(e) => setNote({ ...note, title: e.target.value })}
                        value={note.title}
                        style={{ marginBottom: '1rem' }}
                        required
                    />
                    <textarea
                        placeholder="Add your description"
                        onChange={(e) => setNote({ ...note, description: e.target.value })}
                        style={{ marginBottom: '1rem' }}
                        value={note.description}
                    />
                    <button type="submit" style={{ backgroundColor: '#292929', border: '2px solid #292929', color: '#fff', width: '6rem', cursor: 'pointer' }}>Create issue</button>
                </form>
            </Modal>
        </div>
    );
}

export default PendingList;
