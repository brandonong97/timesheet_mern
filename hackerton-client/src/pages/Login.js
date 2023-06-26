import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/login.css'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  localStorage.removeItem('token')
  localStorage.removeItem('username')
  localStorage.removeItem('is_admin')

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      const token = response.data.token;

      // Save the token to localStorage or use a state management library like Redux
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);

      // Redirect to the appropriate dashboard based on the user's role
      if (response.data.is_admin === 'admin') {
        localStorage.setItem('is_admin', true);
        navigate('/adminportal');
      } else {
        navigate('/userportal');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <NavLink 
      to = "/register" 
      style={{
        margin: '15px',
        color: 'blue',
        fontWeight: 'bold',
      }}>
      Create Account
      </NavLink>
    </div>
  );
}

export default Login;
