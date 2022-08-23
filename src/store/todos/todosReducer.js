/* eslint-disable */
import {ADD_TODO, REMOVE_TODO} from "./todosActions"

const initialStore = {
	todos: [
		{
			_id: new Date().getTime(),
			text: 'foo bar',
			owner: '',
			completed: false,
			important: false
		}
	]
}



export const todosReducer = (store = initialStore, action) => {
	switch (action.type) {
		case ADD_TODO:
			return {...store, todos: [...store.todos, action.payload]}
		case REMOVE_TODO:
			return {...store, todos: store.todos.filter(item => item._id !== action.payload)}
		default: {
			return store
		}
	}
}

