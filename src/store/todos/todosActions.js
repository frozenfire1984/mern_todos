/* eslint-disable */
export const CLEAR_TODOS = 'CLEAR-TODOS'
export const GET_TODOS = 'GET-TODOS'
export const SET_LOADER_TODOS = 'SET-LOADER-TODOS'
export const SET_LOADER_ADDING_TODOS = 'SET-LOADER-ADDING-TODOS'
export const SET_ERROR_TODOS = 'SET-ERROR-TODOS'
export const ADD_TODO = 'ADD-TODO'
export const REMOVE_TODO = 'REMOVE-TODO'
export const PUT_TODO = 'PUT-TODO'

export const clearTodosAction = () => {
	return {
		type: CLEAR_TODOS
	}
}

export const getTodosAction = (payload) => {
	return {
		type: GET_TODOS,
		payload: payload
	}
}

export const setLoaderTodosAction = (payload) => {
	return {
		type: SET_LOADER_TODOS,
		payload: payload
	}
}

export const setLoaderAddingTodosAction = (payload) => {
	return {
		type: SET_LOADER_ADDING_TODOS,
		payload: payload
	}
}

export const setErrorTodosAction = (payload) => {
	return {
		type: SET_ERROR_TODOS,
		payload: payload
	}
}

export const addTodoAction = (payload) => {
	return {
		type: ADD_TODO,
		payload: payload
	}
}

export const removeTodoAction = (payload) => {
	return {
		type: REMOVE_TODO,
		payload: payload
	}
}

export const putTodoAction = (payload) => {
	return {
		type: PUT_TODO,
		payload: payload
	}
}