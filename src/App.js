/* eslint-disable */
import React, {useContext} from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Signin from './pages/Auth/Signin'
import Signup from './pages/Auth/Signup'
import Main from './pages/Main/Main'
import {AuthContext} from './context/AuthContext'
import {useDispatch, useSelector} from "react-redux"
import Counter from "./components/Counter";
import {removeTodoAction} from "./store/"

import './styles/app.scss'


function App() {
	const {isLogin} = useContext(AuthContext)
	
	const counter = useSelector(state => state.counter.score)
	const todos = useSelector(state => state.todos.todos)
	
	const dispatch = useDispatch()
	
	const clickHandler = (item) => {
		dispatch(removeTodoAction(item._id))
	}
	
	return (
		<div className="app">
			<BrowserRouter>
				<Navbar/>
				<Counter />
				counter:{counter}
				<hr/>
				Todos:
				{todos.length > 0
					?
						<div>
							{todos.map((item, index) => {
							return <div key={index} onClick={() => clickHandler(item)}>
								<div>{item._id}</div>
								<div>{item.text}</div>
								
							</div>
						})}
						</div>
					:
						<div>Todos empty!</div>
				}
				
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
