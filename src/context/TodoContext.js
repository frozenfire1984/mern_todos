import React, {createContext, useContext, useState} from 'react'
import {AuthContext} from './AuthContext'
import {AppContext} from './AppContext'
import PropTypes from 'prop-types'

export const TodoContext = createContext(null)

export const TodoProvider = ({children}) => {
	const {userId} = useContext(AuthContext)
	const {vars} = useContext(AppContext)
	
	const [todos, setTodos] = useState([])
	const [loader, setLoader] = useState(false)
	const [loaderAdding, setLoaderAdding] = useState(false)
	const [error, setError] = useState(false)
	
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
						setError(true)
						throw new Error(e)
					})
					.finally(() => {
						setLoader(false)
					})
			}
		} catch (e) {
			console.log(e)
		}
	}
	
	const addTodo = async (text) => {
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
				})
				.catch(e => {
					console.log(e.response.data.errors)
					setError(true)
					throw new Error(e.response.data.msg)
				})
				.finally(() => {
					setLoaderAdding(false)
				})
		} catch (e) {
			console.log(e)
		}
	}
	
	const removeTodo = async (id, index) => {
		const params = new URLSearchParams({
			id: id,
			some: 'foo bar'
		})
		
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
		} catch (e) {
			console.log(e)
		}
	}
	
	const putTodo = async (id, index, type) => {
		const params = new URLSearchParams({
			type: type,
		})
		
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
		} catch (e) {
			console.log(e)
		}
	}
	
	return <TodoContext.Provider value={{todos, loader, loaderAdding, error, getTodos, addTodo, removeTodo, putTodo}}>
		{children}
	</TodoContext.Provider>
}

TodoProvider.propTypes = {
	children: PropTypes.object.isRequired
}