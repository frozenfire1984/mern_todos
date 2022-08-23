/* eslint-disable */
export const ADD_TODO = 'ADD-TODO'
export const REMOVE_TODO = 'REMOVE-TODO'

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