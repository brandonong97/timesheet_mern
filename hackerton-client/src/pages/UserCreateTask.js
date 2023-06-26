import React, { useEffect ,useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

var ename = localStorage.getItem('username')

function UserCreateTask() {
  //const [task_id, settaskid] = useState('');
  const [taskdate, setTaskdate] = useState('');
  const [starttime, setstarttime] = useState('');
  const [endtime, setendtime] = useState('');
  const [tasktype, settasktype] = useState('');
  const [taskstatus, settaskstatus] = useState('');
  const [description, setdescription] = useState('');
  const [catid, setCatid] = useState('');
  //const [ename, setename] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleTask = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/usercreatetask', {
        //task_id,
        catid,
        taskdate,
        starttime,
        endtime,
        tasktype,
        taskstatus,
        description,
        ename
        
      });
      navigate("/userportal");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleTask}>
      {/* <input
          type="int"
          placeholder="Taskid"
          value={task_id}
          onChange={(e) => settaskid(e.target.value)}
        /> */}
        <input
          type="text"
          placeholder="catid"
          value={catid}
          onChange={(e) => setCatid(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date of Task"
          value={taskdate}
          onChange={(e) => setTaskdate(e.target.value)}
        />
        <input
          type="time"
          placeholder="Start Time"
          value={starttime}
          onChange={(e) => setstarttime(e.target.value)}
        />
        <input
          type="time"
          placeholder="End Time"
          value={endtime}
          onChange={(e) => setendtime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task Type"
          value={tasktype}
          onChange={(e) => settasktype(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task Status"
          value={taskstatus}
          onChange={(e) => settaskstatus(e.target.value)}
        />
        <input
          type="text"
          placeholder="Describe The Task"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default UserCreateTask;