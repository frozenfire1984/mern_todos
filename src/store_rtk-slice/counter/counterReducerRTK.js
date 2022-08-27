/* eslint-disable */
import {createAction, createReducer, createSlice} from '@reduxjs/toolkit'

/*const initialState = {
	score: 10
}


const increment = createAction("INCREMENT")
const incrementCustom = createAction("INCREMENT_CUSTOM")
const decrement = createAction("DECREMENT")
const decrementCustom = createAction("DECREMENT_CUSTOM")
const reset = createAction("RESET")

const counterReducerRTK = createReducer(initialState, {
	[increment]: (state) => {
		state.score++
	},
	[incrementCustom]: (state, action) => {
		state.score = state.score + action.payload
	},
	[decrement]: (state) => {
		state.score > 0 ? state.score-- : null
	},
	[decrementCustom]: (state, action) => {
		state.score = state.score - action.payload
	},
	[reset]: (state) => {
		state.score = initialState.score
	}
})*/

const initialState = {
	score: 10
}


const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		increment(state) {
			state.score++
		},
		incrementCustom(state, action) {
			state.score += action.payload
		},
		decrement(state) {
			state.score--
		},
		decrementCustom(state, action) {
			state.score -= action.payload
		},
		reset(state) {
			state.score = initialState.score
		}
	}
})


export default counterSlice.reducer
export const {increment, incrementCustom, decrement, decrementCustom, reset} = counterSlice.actions