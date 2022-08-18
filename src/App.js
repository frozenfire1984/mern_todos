import React, {useContext, useState} from 'react'
import {BrowserRouter, Routes, Route, Outlet, Link, NavLink, useParams, Navigate} from 'react-router-dom'
import Signin from './pages/Auth/Signin'
import Signup from './pages/Auth/Signup'
import Main from './pages/Main/Main'
import Info from './pages/Info/Info'
import Test from './pages/Test/Test'
import Navbar from './components/Navbar/Navbar'
import {AuthContext} from './context/AuthContext'
//import {TestContext, defaultState} from './context/TestContext'
//import {TestProvider} from './context/TestContext'

import './styles/app.scss'

function App() {
	const {isLogin} = useContext(AuthContext)
	
	/*const [status, setStatus] = useState(defaultState.status)*/
	//console.log(status)
	
	return (

		<div className="app">
			<BrowserRouter>
				<Navbar/>
				<Routes>
					<Route path="/" element={isLogin ? <Main/> : <Navigate to="/signin"/>}/>
					<Route path="/signin" element={isLogin ? <Navigate to="/"/> : <Signin/>}/>
					<Route path="/signup" element={isLogin ? <Navigate to="/"/> : <Signup/>}/>
					<Route path="/info" element={<Info />}/>
					<Route path="/test" element={<Test />}/>
				</Routes>
			</BrowserRouter>
		</div>

	)
}

export default App
