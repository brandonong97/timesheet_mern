import React, { useState } from 'react';
import axios from 'axios';
//import { useHistory } from 'react-router-dom';
import { NavLink, useNavigate } from 'react-router-dom'
import '../css/register.css'

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  localStorage.removeItem('token')
  localStorage.removeItem('username')

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/register', {
        username,
        password
      });

      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <NavLink to = "/login"       style={{
        margin: '15px',
        color: 'blue',
        fontWeight: 'bold',
      }}>Go to Login</NavLink>
    </div>
  );
}

export default Register;