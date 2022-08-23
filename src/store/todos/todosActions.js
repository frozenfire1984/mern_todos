/* eslint-disable */
export const CLEAR_TODOS = 'CLEAR-TODOS'
export const GET_TODOS = 'GET-TODOS'
export const SWITCH_LOADER = 'SWITCH-LOADER-TODOS'
export const SET_ERROR_TODOS = 'SET-ERROR-TODOS'

export const ADD_TODO = 'ADD-TODO'
export const REMOVE_TODO = 'REMOVE-TODO'

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

export const switchTodosLoaderAction = (payload) => {
	return {
		type: SWITCH_LOADER,
		payload: payload
	}
}

export const setErrorTodosAction = (payload) => {
	return {
		type: SET_ERROR_TODOS,
		payload: payload
	}
}

export const addTodosAction = (payload) => {
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