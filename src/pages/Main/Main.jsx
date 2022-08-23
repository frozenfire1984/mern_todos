/* eslint-disable */
import React, {useContext, useState, useCallback, useEffect} from 'react'
import './Main.scss'
import {AuthContext} from '../../context/AuthContext'
import {AppContext} from '../../context/AppContext'
import Todo from './Todo/Todo'
import Form from './Form'
import './Main.scss'
import {useDispatch, useSelector} from "react-redux"
import {getTodos} from "../../middleWares/getTodos"
import {clearTodosAction} from "../../store/todos/todosActions"

const Main = () => {
	const {isLogin, userId, isReady} = useContext(AuthContext)
	const {vars} = useContext(AppContext)
	
	//const {todos, loader, error, getTodos, removeTodo, putTodo} = useContext(TodoContext)
	
	const {todos, loading, error} = useSelector(store => store.todos)
	const dispatch = useDispatch()
	
	useEffect(() => {
		dispatch(getTodos(userId, vars))
		return () => {
			dispatch(clearTodosAction())
		}
	}, [userId])
	
	return (
		<>
			<Form/>
			<div className="container">
				<h3 className="heading">Active tasks</h3>
				<div className="todos">
					{loading && <div className="loading">loading...</div>}
					
					{!loading && todos && todos.map((todo, index) => (
						<Todo
							key={index}
							index={index}
							todo={todo}
							//putTodo={putTodo}
							//removeTodo={removeTodo}
						/>
					))}
					
					{error && <div className="error">Error</div>}
				</div>
			</div>
		</>
	)
}

export default Main