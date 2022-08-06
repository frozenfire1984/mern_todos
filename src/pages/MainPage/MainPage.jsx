/* eslint-disable */
import React, {useContext, useState, useCallback, useEffect} from 'react'
import './MainPage.scss'
//import {Link} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios'
import './MainPage.scss'

const MainPage = () => {
	
	const {isLogin, userId, isReady} = useContext(AuthContext)
	
	const [text, setText] = useState("")
	const [todos, setTodos] = useState([])
	const [loader, setLoader] = useState(false)
	//const [isMounted, setIsMounted] = useState(false)
	//console.log(userId)
	
	/*const changeHandler = (event) => {
		setText(event.target.value)
	}*/
	
	const getTodos = async () => {
		setLoader(true)
		try {
			/*await axios.get("http://localhost:5001/api/todo",
				{
					params: {
						id: userId,
					}
				},
				{
					headers: {
						'Content-Type': 'application/json'
					}
				})*/
			
			if (userId) {
				const params = new URLSearchParams({
					id: userId
				})
				
				/*await axios.get("http://localhost:5001/api/todo",
					{
						params: {
							id: userId,
						}
					},
					{
						headers: {
							'Content-Type': 'application/json'
						}
					})
					.then(res => {
					setTodos(res.data)
					setLoader(false)
				})*/
				
				await fetch(`http://localhost:5001/api/todo?${params}`,
					{
						method: "GET",
						headers: {
							'Content-Type': 'application/json'
						}
					})
					.then(res => res.json())
					.then(data => {
						setTodos(data)
					})
					.catch((e) => {
						throw new Error(e)
					})
			}
			
			
		} catch (e) {
			console.log(e)
		}
	}
	
	useEffect( () => {
		 getTodos().then(() => {
			 setLoader(false)
		 })
		
		return () => {
			setText("")
			setTodos([])
		}
	}, [])
	
	/*useEffect(() => {
		console.log(todos)
	},[todos])*/
	
	const addTodo = useCallback(async () => {
		console.log("add")
		if (!text) return null
		
		try {
			/*await axios.post("http://localhost:5001/api/todo/add",
				{
					text: text,
					userId: userId
				},
				{
					headers: {
						'Content-Type': 'application/json'
					}
				})*/
			await fetch('http://localhost:5001/api/todo/add',
				{
					method: "POST",
					body: JSON.stringify({
						text: text,
						userId: userId
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(res => res.json())
				.then(data => {
					setTodos([...todos, data])
					//getTodos()
					setText("")
				})
				.catch(e => {
					console.log(e.response.data.errors)
					throw new Error(e.response.data.msg)
				})
		} catch (e) {
			console.log(e)
		}
	}, [text])
	
	const removeTodo = async (id, index) => {
		console.log(id)
		
		const params = new URLSearchParams({
			id: id,
			some: 'foo bar'
		})
		
		try {
			/*axios.delete(`http://localhost:5001/api/todo/delete`,
				{
					params: {
						id: id,
					}
				},
				{
					headers: {
						'Content-Type': 'application/json'
					}
				})*/
			await fetch(`http://localhost:5001/api/todo?${params}`,
				{method: "DELETE"}
			)
				.then(res => res.json())
				.then(data => {
					//console.log(data)
					//getTodos()
					setTodos([
						...todos.slice(0, index),
						...todos.slice(index + 1, todos.length)
					])
				})
				.catch(e => {
					throw new Error(e)
				})
		} catch (e) {
			console.log(e)
		}
	}
	
	const putTodo = useCallback(async (id, index, type) => {
		const params = new URLSearchParams({
			type: type,
		})
		
		try {
			await fetch(`http://localhost:5001/api/todo?${params}`,
				{
					method: "PUT",
					body: JSON.stringify({
						id: id
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
				.then(res => res.json())
				.then(data => {
					setTodos([
						...todos.slice(0, index),
						data,
						...todos.slice(index + 1, todos.length)
					])
				})
				.catch(e => {
					throw new Error(e)
				})
		} catch (e) {
			console.log(e)
		}
	}, [todos])
	
	//if (isMounted) {
		return (
				<div className="container">
					<div className="main-page">
						<h4>Add Task</h4>
						<form className="form form-login" onSubmit={e => e.preventDefault()}>
							<div className="row">
								<div className="input-field col s12">
									<input
										type="text"
										id="input"
										name="input"
										className="validate"
										value={text}
										onChange={(e) => setText(e.target.value)}
									/>
									<label htmlFor="input">Task</label>
								</div>
							</div>
							<div className="row">
								<button onClick={addTodo} className="waves-effect waves-light btn blue">Add</button>
							</div>
						</form>
						
						<h4>Active tasks</h4>
						<div className="todos">
							
							{loader && <div>loading...</div>}
							
							{!loader && todos && todos.map((todo, index) => {
								return (
									<div key={index} className={`
								row todos__item
								${todo.completed ? 'todos__item_completed' : ''}
								${todo.important ? 'todos__item_important' : ''}
								`}>
										<div className="col todos__num">{index + 1}</div>
										<div className="col todos__text">{todo.text}</div>
										<div className="col todos__btns">
											<button onClick={() => putTodo(todo._id, index, "completed")}
															type="button"
															className="btn blue">check
											</button>
											<button onClick={() => putTodo(todo._id, index, "important")}
															type="button"
															className="btn orange">warning
											</button>
											<button onClick={() => removeTodo(todo._id, index)}
															type="button"
															className="btn red">delete
											</button>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
		
		)
	//}
	
	//return null
	
	
}

export default MainPage