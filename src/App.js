/* eslint-disable */
import React, {useState} from 'react'
import {BrowserRouter, Routes, Route, Outlet, Link, NavLink, useParams, Navigate} from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import AuthPage from "./pages/AuthPage/AuthPage";
import MainPage from "./pages/MainPage/MainPage";
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
							<Route path="/" element={isLogin ? <MainPage /> : <Navigate to="/signin" />} />
							<Route path="/signin" element={isLogin ? <Navigate to="/"	 /> : <AuthPage /> } />
						</Routes>
					</BrowserRouter>
				</div>
			</AuthContext.Provider>
		</AppContext.Provider>
	);
}

export default App;
