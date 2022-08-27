/* eslint-disable */
import {createAction, createReducer} from '@reduxjs/toolkit'

const initialState = {
	score: 10
}

/*const counterReducerRTK = (state = initialState, action) => {
	switch (action.type) {
		case INCR:
			return {...state, score: state.score + Number(action.payload)}
		case DECR:
			if (state.score - action.payload <= 0) return initialState
			return {...state, score: state.score - Number(action.payload)}
		case RESET:
			return initialState
		default:
			return state`
	}
}*/
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
})


// alternative syntax
/*
const counterReducerRTK = createReducer(initialState, (builder) => {
	builder.addCase(increment, (state, action) => {
		state.score++
	})
	builder.addCase(incrementCustom, (state, action) => {
		state.score = state.score + action.payload
	})
	builder.addCase(decrement, (state, action) => {
		state.score--
	})
	builder.addCase(decrementCustom, (state, action) => {
		state.score = state.score - action.payload
	})
	builder.addCase(reset, (state, action) => {
		state.score = initialState.score
	})
})
*/


export {counterReducerRTK, increment, incrementCustom, decrement, decrementCustom, reset}