import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import UserDashboard from './UserCustomTimeline'

function Userportal() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        setMessage(response.data.message);
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>User Portal</h2>
      <UserDashboard/>
      <NavLink to = "/usercreatetask"       style={{
        margin: '15px',
        color: 'blue',
        fontWeight: 'bold',
      }}>Create Task</NavLink> <br/>
      <NavLink to = "/userdeletetask"       style={{
        margin: '15px',
        color: 'blue',
        fontWeight: 'bold',
      }}>Delete Task</NavLink> <br/>
      <NavLink to = "/login"       style={{
        margin: '15px',
        color: 'blue',
        fontWeight: 'bold',
      }}>Log out</NavLink>
    </div>
  );
}

export default Userportal;