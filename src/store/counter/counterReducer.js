/* eslint-disable */
import {INCR, DECR, RESET} from "./counterActions"

const initialState = {
	score: 10
}

const counterReducer = (state = initialState, action) => {
	switch (action.type) {
		case INCR:
			return {...state, score: state.score + Number(action.payload)}
		case DECR:
			if (state.score - action.payload <= 0) return initialState
			return {...state, score: state.score - Number(action.payload)}
		case RESET:
			return initialState
		default:
			return state
	}
}

export {counterReducer}