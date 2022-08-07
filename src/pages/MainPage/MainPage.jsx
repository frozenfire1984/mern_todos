/* eslint-disable */
import React, {useContext, useState, useCallback, useEffect} from 'react'
import './MainPage.scss'
import {AuthContext} from '../../context/AuthContext'
import {AppContext} from '../../context/AppContext'
import Todo from './Todo/Todo'
import './MainPage.scss'

const MainPage = () => {
	
	const {isLogin, userId, isReady} = useContext(AuthContext)
	const {vars} = useContext(AppContext)
	const [text, setText] = useState("")
	const [todos, setTodos] = useState([])
	const [loader, setLoader] = useState(false)

	const getTodos = async () => {
		setLoader(true)
		try {
			if (userId) {
				const params = new URLSearchParams({
					id: userId
				})
				
				await fetch(`${vars.url}/api/todo?${params}`,
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
	
	useEffect(() => {
		getTodos().then(() => {
			setLoader(false)
		})
		
		return () => {
			setText("")
			setTodos([])
		}
	}, [])
	
	const addTodo = useCallback(async () => {
		console.log("add")
		if (!text) return null
		
		try {
			await fetch(`${vars.url}/api/todo/add`,
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
			await fetch(`${vars.url}/api/todo?${params}`,
				{method: "DELETE"}
			)
				.then(res => res.json())
				.then(data => {
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
			await fetch(`${vars.url}/api/todo?${params}`,
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
					
					{!loader && todos && todos.map((todo, index) => (
						<Todo key={index} index={index} item={todo} put={putTodo} remove={removeTodo} />
					))}
				</div>
			</div>
		</div>
	)
}

export default MainPage