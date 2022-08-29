/* eslint-disable */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
	todos: [],
	loading: false,
	loadingAdding: false,
	error: false,
}

export const fetchTodos = createAsyncThunk(
	'todos/get',
	async function({url, userId}) {

		const params = new URLSearchParams({
			id: userId
		})

		const resp = await fetch(`${url}/api/todo?${params}`,{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}})
		return await resp.json()
	}
)

const todosSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		clear(state) {
			state = initialState
		},
		/*get(state, action) {
			state.todos = [...action.payload]
			state.error = false
		},
		setLoading(state, action) {
			state.loading = action.payload
		},*/
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
	},
	extraReducers: {
		[fetchTodos.pending]: (state) => {
			state.loading = true
			state.error = false
		},
		[fetchTodos.fulfilled]: (state, action) => {
			state.loading = false
			state.todos = [...action.payload]
		},
		[fetchTodos.rejected]: (state, action) => {
			state.loading = false
			state.error = true
		}
	}
})

export default todosSlice.reducer
export const {
	clear,
	//get,
	//setLoading,
	setLoadingAdding,
	setError,
	add,
	remove,
	put
} = todosSlice.actions

