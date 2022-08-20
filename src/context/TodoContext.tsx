import React, {createContext, ReactNode, useContext, useState, FC} from 'react'
import {AuthContext, IAuth} from './AuthContext'
import {AppContext, IApp} from './AppContext'
import ITodo from '../@type/todo'

type TProps = {
	children: ReactNode
}

export interface ITodoContext {
	todos: ITodo[],
	loader: boolean
	loaderAdding: boolean
	error: boolean
	getTodos: () => void
	addTodo: (text: string) => void
	removeTodo: (id: string, index: number) => void
	putTodo: (id: string, index: number, type: string) => void
}

export const TodoContext = createContext<ITodoContext | null>(null)

export const TodoProvider: FC<TProps> = ({children}) => {
	const {userId} = useContext(AuthContext) as IAuth
	const {vars} = useContext(AppContext) as IApp
	
	const [todos, setTodos] = useState<ITodo[]>([])
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
	
	const addTodo = async (text: string) => {
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
				.then((data) => {
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
	
	const removeTodo = async (id: string, index: number) => {
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
	
	const putTodo = async (id: string, index: number, type: string) => {
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

