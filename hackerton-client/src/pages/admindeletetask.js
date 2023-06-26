import React, { useEffect ,useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function AdminDeleteTask() {
  const [task_id, setTaskId] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const is_admin = localStorage.getItem("is_admin");
    if (!token || !is_admin) {
      navigate("/login");
    }
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/admindeletetask', { id: task_id });
      setMessage(response.data.message);
      navigate("/adminportal");
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred while deleting the task');
      }
    }
  };

  return (
    <div>
      <h1>Delete Task</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskId">Task ID:</label>
        <input type="text" id="taskId" name="taskId" value={task_id} onChange={event => setTaskId(event.target.value)} />
        <button type="submit">Delete Task</button>
      </form>
      <div>{message}</div>
    </div>
  );
}

export default AdminDeleteTask;