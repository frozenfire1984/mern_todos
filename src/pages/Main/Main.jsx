import React, {useContext, useState, useCallback, useEffect, useRef} from 'react'
import {AuthContext} from '../../context/AuthContext'
import {AppContext} from '../../context/AppContext'
import Todo from './Todo/Todo'
import './Main.scss'

const Main = () => {
	const {userId} = useContext(AuthContext)
	const {vars} = useContext(AppContext)
	const [text, setText] = useState('')
	const [todos, setTodos] = useState([])
	const [loader, setLoader] = useState(false)
	const [loaderAdding, setLoaderAdding] = useState(false)
	
	const getTodos = async () => {
		setLoader(true)
		try {
			if (userId) {
				const params = new URLSearchParams({
					id: userId
				})
				
				await fetch(`${vars.url}/api/todo?${params}`,
					{
						method: 'GET',
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
			setText('')
			setTodos([])
		}
	}, [])
	
	const refTodos = useRef(null)
	
	const addTodo = async (e) => {
		console.log('Add Todo')
		e.preventDefault()
		if (!text) return null
		setLoaderAdding(true)
		
		try {
			await fetch(`${vars.url}/api/todo/add`,
				{
					method: 'POST',
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
					setText('')
				})
				.catch(e => {
					console.log(e.response.data.errors)
					throw new Error(e.response.data.msg)
				})
				.finally(() => {
					setLoaderAdding(false)
				})
		} catch (e) {
			console.log(e)
		}
	}
	
	const removeTodo = useCallback(async (id, index) => {
		console.log('Remove Todo')
		console.log(id)
		
		const params = new URLSearchParams({
			id: id,
			some: 'foo bar'
		})
		
		let activeTodo = refTodos.current.querySelector(`#todo-id-${id}`)
		activeTodo.classList.add('todo_waiting')
		
		try {
			await fetch(`${vars.url}/api/todo?${params}`,
				{method: 'DELETE'}
			)
				.then(res => res.json())
				.then(() => {
					setTodos([
						...todos.slice(0, index),
						...todos.slice(index + 1, todos.length)
					])
				})
				.catch(e => {
					throw new Error(e)
				})
				.finally(() => {
					activeTodo.classList.remove('todo_waiting')
					activeTodo = undefined
				})
		} catch (e) {
			console.log(e)
		}
	},[todos])
	
	const putTodo = useCallback(async (id, index, type) => {
		console.log('Put Todo')
		const params = new URLSearchParams({
			type: type,
		})
		
		let activeTodo = refTodos.current.querySelector(`#todo-id-${id}`)
		activeTodo.classList.add('todo_waiting')
		
		try {
			await fetch(`${vars.url}/api/todo?${params}`,
				{
					method: 'PUT',
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
				.finally(() => {
					activeTodo.classList.remove('todo_waiting')
					activeTodo = undefined
				})
		} catch (e) {
			console.log(e)
		}
	},[todos])
	
	return (
		<>
			<div className="container container_narrow">
				<h3 className="heading">Add Task</h3>
				<form className={`form ${loaderAdding ? 'form_disabled' : ''}`} onSubmit={addTodo}>
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
					<div className="row">
						<div className="loader-holder">
							{loaderAdding && <div>sending...</div>}
						</div>
					</div>
				</form>
			</div>
			
			<div className="container container_todos">
				<h3 className="heading">Active tasks</h3>
				<div className="todos" ref={refTodos}>
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