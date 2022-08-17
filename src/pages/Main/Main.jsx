/* eslint-disable */
import React, {useContext, useState, useCallback, useEffect} from 'react'
import './Main.scss'
import {AuthContext} from '../../context/AuthContext'
import {AppContext} from '../../context/AppContext'
import Todo from './Todo/Todo'
import './Main.scss'

const Main = () => {
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
	
	const addTodo = async (e) => {
		console.log("Add Todo")
		e.preventDefault()
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
	}
	
	const removeTodo = async (id, index) => {
		console.log("Remove Todo")
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
	
	const putTodo = async (id, index, type) => {
		console.log("Put Todo")
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
	}
	
	return (
		<>
			<div className="container container_narrow">
				<h3 className="heading">Add Task</h3>
				<form className={`form`} onSubmit={addTodo}>
					<div className="form__row">
						<input
							type="text"
							id="input"
							name="input"
							className="validate"
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>
					</div>
					<div className="row">
						<button type="submit" className="btn" disabled={!text}>Add</button>
					</div>
				</form>
			</div>
			
			<div className="container">
				<h3 className="heading">Active tasks</h3>
				<div className="todos">
					{loader && <div className="loading">loading...</div>}
					
					{!loader && todos && todos.map((todo, index) => (
						<Todo key={index} index={index} item={todo} put={putTodo} remove={removeTodo}/>
					))}
				</div>
			
			</div>
		</>
	)
}

export default Main