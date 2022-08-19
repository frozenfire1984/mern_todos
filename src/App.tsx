import React, {useContext, useState} from 'react'
import {BrowserRouter, Routes, Route, Outlet, Link, NavLink, useParams, Navigate} from 'react-router-dom'
import {AuthContext, IAuth} from './context/AuthContext'
import Signin from './pages/Auth/Signin'
import Signup from './pages/Auth/Signup'
import Main from './pages/Main/Main'
import Info from './pages/Info/Info'
import Test from './pages/Test/Test'
import Navbar from './components/Navbar/Navbar'
import './styles/app.scss'

function App() {
	const {isLogin} = useContext(AuthContext) as IAuth
	
	return (
		<div className="app">
			<BrowserRouter>
				<Navbar/>
				<Routes>
					<Route path="/" element={isLogin ? <Main/> : <Navigate to="/signin"/>}/>
					<Route path="/signin" element={isLogin ? <Navigate to="/"/> : <Signin/>}/>
					<Route path="/signup" element={isLogin ? <Navigate to="/"/> : <Signup/>}/>
					<Route path="/info" element={<Info param="test" />}/>
					<Route path="/test" element={<Test />}/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
