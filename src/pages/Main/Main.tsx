import React, {useContext, useEffect} from 'react'
import './Main.scss'
import {TodoContext, ITodoContext} from '../../context/TodoContext'
import Todo from './Todo/Todo'
import Form from './Form'
import ITodo from '../../@type/todo'
import './Main.scss'

const Main = () => {
	const {todos, loader, error, getTodos, removeTodo, putTodo} = useContext(TodoContext) as ITodoContext
	
	useEffect(() => {
		getTodos()
		
		return () => {
			//setText("")
			//setTodos([])
		}
	}, [])
	

	return (
		<>
			<Form/>
			<div className="container">
				<h3 className="heading">Active tasks</h3>
				<div className="todos">
					{loader && <div className="loading">loading...</div>}
					
					{!loader && todos && todos.map((todo: ITodo, index: number) => (
						<Todo key={index} index={index} todo={todo} putTodo={putTodo} removeTodo={removeTodo}/>
					))}
					
					{error && <div className="error">Error</div>}
				</div>
			</div>
		</>
	)
}

export default Main