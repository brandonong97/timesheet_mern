import React from 'react';
import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Adminportal from './pages/Adminportal';
import Userportal from './pages/Userportal';
import AdminCreateTask from './pages/AdminCreateTask'
import UserCreateTask from './pages/UserCreateTask'
import AdminDeleteTask from './pages/admindeletetask';
import UserDeleteTask from './pages/userdeletetask';

const App = () => {
	return (
		<div>
			<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to ="/login" replace/>}/>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/register" element={<Register />}></Route>
				<Route path="/adminportal" element={<Adminportal />}></Route>
				<Route path="/userportal" element={<Userportal />}></Route>
				<Route path="/admincreatetask" element={<AdminCreateTask />}></Route>
				<Route path="/usercreatetask" element={<UserCreateTask />}></Route>
				<Route path="/admindeletetask" element={<AdminDeleteTask />}></Route>
				<Route path="/userdeletetask" element={<UserDeleteTask />}></Route>
			</Routes>
			</BrowserRouter>
		</div>
	)
  }


export default App;