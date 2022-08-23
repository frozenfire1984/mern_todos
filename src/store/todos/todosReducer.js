/* eslint-disable */
import {GET_TODOS, SWITCH_LOADER, SET_ERROR_TODOS, ADD_TODO, REMOVE_TODO, CLEAR_TODOS} from "./todosActions"

const initialstate = {
	todos: [],
	loading: false,
	error: false,
}

export const todosReducer = (state = initialstate, action) => {
	switch (action.type) {
		case CLEAR_TODOS:
			console.log("clear!")
			return initialstate
		case GET_TODOS:
			return {
				...state,
				todos: [...state.todos, ...action.payload],
				//loading: false,
				error: false
			}
		case SWITCH_LOADER:
			return {
				...state,
				loading: action.payload
			}
		case SET_ERROR_TODOS:
			return {
				...state,
				error: action.payload,
				//loading: false
			}
			
		case ADD_TODO:
			return {...state, todos: [...state.todos, action.payload]}
		case REMOVE_TODO:
			return {...state, todos: state.todos.filter(item => item._id !== action.payload)}
		default: {
			return state
		}
	}
}

