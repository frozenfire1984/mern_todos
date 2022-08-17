/* eslint-disable */
import React, {useState} from 'react'
import {BrowserRouter, Routes, Route, Outlet, Link, NavLink, useParams, Navigate} from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Main from "./pages/Main/Main";
import Info from "./pages/Info/Info";
import {AuthContext} from './context/AuthContext'
import {AppContext, vars} from './context/AppContext'
import {useAuth} from "./hooks/auth.hook"

import './styles/app.scss'

function App() {
	const {login, logout, token, userId, isReady} = useAuth()
  const isLogin = !!token
	
	return (
		<AppContext.Provider value={{vars}}>
			<AuthContext.Provider value={{login, logout, token, userId, isReady, isLogin}}>
				<div className="app">
					<BrowserRouter>
						<Navbar/>
						<Routes>
							<Route path="/" element={isLogin ? <Main /> : <Navigate to="/signin" />} />
							<Route path="/signin" element={isLogin ? <Navigate to="/"	 /> : <Signin /> } />
							<Route path="/signup" element={isLogin ? <Navigate to="/"	 /> : <Signup /> } />
							<Route path="/info" element={<Info param="foo bar" />} />
						</Routes>
					</BrowserRouter>
				</div>
			</AuthContext.Provider>
		</AppContext.Provider>
	);
}

export default App;
