/* eslint-disable */
import {createContext, useContext, useState} from 'react';
import {AuthContext} from "./AuthContext";
import {AppContext} from "./AppContext";

export const TodoContext = createContext(null)

export const TodoProvider = ({children}) => {
	const {isLogin, userId, isReady} = useContext(AuthContext)
	const {vars} = useContext(AppContext)
	
	const [todos, setTodos] = useState([])
	const [loader, setLoader] = useState(false)
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
		console.log("Add Todo")
		//e.preventDefault()
		//if (!text) return null
		
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
					//setText("")
				})
				.catch(e => {
					console.log(e.response.data.errors)
					setError(true)
					throw new Error(e.response.data.msg)
					
				})
				.finally(() => {
					setLoader(false)
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
	
	
	
	return <TodoContext.Provider value={{todos, loader, error, getTodos, addTodo, removeTodo, putTodo}}>
		{children}
	</TodoContext.Provider>
}