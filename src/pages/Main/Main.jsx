/* eslint-disable */
import React, {useContext, useState, useCallback, useEffect} from 'react'
import './Main.scss'
import {AuthContext} from '../../context/AuthContext'
import {AppContext} from '../../context/AppContext'
import {TodoContext} from "../../context/TodoContext";
import Todo from './Todo/Todo'
import Form from './Form'
import './Main.scss'

const Main = () => {
	const {isLogin, userId, isReady} = useContext(AuthContext)
	const {vars} = useContext(AppContext)
	
	const {todos, loader, error, getTodos, removeTodo, putTodo} = useContext(TodoContext)
	
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
					
					{!loader && todos && todos.map((todo, index) => (
						<Todo key={index} index={index} todo={todo} putTodo={putTodo} removeTodo={removeTodo}/>
					))}
					
					{error && <div className="error">Error</div>}
				</div>
			</div>
		</>
	)
}

export default Main