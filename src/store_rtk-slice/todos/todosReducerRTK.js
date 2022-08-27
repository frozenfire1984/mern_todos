/* eslint-disable */
import { createSlice} from '@reduxjs/toolkit'

const initialState = {
	todos: [],
	loading: false,
	loadingAdding: false,
	error: false,
}

const todosSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		clear(state) {
			state = initialState
		},
		get(state, action) {
			state.todos = [...action.payload]
			state.error = false
		},
		setLoading(state, action) {
			state.loading = action.payload
		},
		setLoadingAdding(state, action) {
			state.loadingAdding = action.payload
		},
		setError(state, action) {
			state.error = action.payload
		},
		add(state, action) {
			state.todos.push(action.payload)
		},
		remove(state, action) {
			state.todos = state.todos.filter(item => item._id !== action.payload)
		},
		put(state, action) {
			state.todos[action.payload.index] = action.payload.data
		}
	}
})

export default todosSlice.reducer
export const {
	clear,
	get,
	setLoading,
	setLoadingAdding,
	setError,
	add,
	remove,
	put
} = todosSlice.actions

