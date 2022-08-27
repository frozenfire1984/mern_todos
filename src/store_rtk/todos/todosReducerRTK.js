/* eslint-disable */
import {createAction, createReducer} from '@reduxjs/toolkit'

const initialstate = {
	todos: [],
	loading: false,
	loadingAdding: false,
	error: false,
}

const clearTodos = createAction("CLEAR_TODOS")
const getTodos = createAction("GET_TODOS")
const setLoadingTodos = createAction("SET_LOADER_TODOS")
const setLoadingAddingTodos = createAction("SET_LOADER_ADDING_TODOS")
const setErrorTodos = createAction("SET_ERROR_TODOS")
const addTodo = createAction("ADD_TODO")
const removeTodo = createAction("REMOVE_TODO")
const putTodo = createAction("PUT_TODO")

const todosReducerRTK = createReducer(initialstate, {
	[clearTodos]: (state) => {
		state = initialstate	
	},
	[getTodos]: (state, action) => {
		//state.todos.push(action.payload)
		state.todos = [...action.payload]
	},
	[setLoadingTodos]: (state, action) => {
		state.loading = action.payload
	},
	[setLoadingAddingTodos]: (state, action) => {
		state.loadingAdding = action.payload
	},
	[setErrorTodos]: (state, action) => {
		state.error = action.payload
	},
	[addTodo]: (state, action) => {
		state.todos.push(action.payload)
	},
	[removeTodo]: (state, action) => {
		state.todos = state.todos.filter(item => item._id !== action.payload)
	},
	[putTodo]: (state, action) => {
		state.todos[action.payload.index] = action.payload.data
	}
})

export {
	todosReducerRTK,
	clearTodos,
	getTodos,
	setLoadingTodos,
	setLoadingAddingTodos,
	setErrorTodos,
	addTodo,
	removeTodo,
	putTodo
}


