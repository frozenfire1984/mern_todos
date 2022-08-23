/* eslint-disable */
import {
	GET_TODOS,
	SET_LOADER_TODOS, SET_LOADER_ADDING_TODOS,
	SET_ERROR_TODOS,
	ADD_TODO,
	REMOVE_TODO,
	CLEAR_TODOS, PUT_TODO,
} from "./todosActions"

const initialstate = {
	todos: [],
	loading: false,
	loadingAdding: false,
	error: false,
}

export const todosReducer = (state = initialstate, action) => {
	switch (action.type) {
		case CLEAR_TODOS:
			return initialstate
		
		case GET_TODOS:
			return {
				...state,
				todos: [...state.todos, ...action.payload],
				error: false
			}
			
		case SET_LOADER_TODOS:
			return {
				...state,
				loading: action.payload
			}
		
		case SET_LOADER_ADDING_TODOS:
			return {
				...state,
				loadingAdding: action.payload
			}
			
		case SET_ERROR_TODOS:
			return {
				...state,
				error: action.payload,
			}
			
		case ADD_TODO:
			return {
				...state,
				todos: [...state.todos, action.payload]
			}
		
		case REMOVE_TODO:
			return {
				...state,
				todos: state.todos.filter(item => item._id !== action.payload)
			}
		
		case PUT_TODO:
			return {
				...state,
				todos: [
					...state.todos.slice(0, action.payload.index),
					action.payload.data,
					...state.todos.slice(action.payload.index + 1, state.todos.length)
				]
			}
			
		default: {
			return state
		}
	}
}

