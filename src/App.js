import React, {useContext, useState} from 'react'
import {BrowserRouter, Routes, Route, Outlet, Link, NavLink, useParams, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Signin from './pages/Auth/Signin'
import Signup from './pages/Auth/Signup'
import Main from './pages/Main/Main'
import {AuthContext} from './context/AuthContext'

import './styles/app.scss'

function App() {
	const {isLogin} = useContext(AuthContext)
	
	return (
		<div className="app">
			<BrowserRouter>
				<Navbar/>
				<Routes>
					<Route path="/" element={isLogin ? <Main/> : <Navigate to="/signin"/>}/>
					<Route path="/signin" element={isLogin ? <Navigate to="/"/> : <Signin/>}/>
					<Route path="/signup" element={isLogin ? <Navigate to="/"/> : <Signup/>}/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
