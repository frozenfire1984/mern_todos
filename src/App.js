/* eslint-disable */
import React, {useContext} from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Signin from './pages/Auth/Signin'
import Signup from './pages/Auth/Signup'
import Main from './pages/Main/Main'
import {AuthContext} from './context/AuthContext'
import {useSelector} from "react-redux";
import Counter from "./components/Counter";

import './styles/app.scss'

function App() {
	const {isLogin} = useContext(AuthContext)
	
	const score = useSelector(state => state.score)
	
	return (
		<div className="app">
			<BrowserRouter>
				<Navbar/>
				<Counter />
				score:{score}
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
