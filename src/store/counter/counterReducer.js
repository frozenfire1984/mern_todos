const initialStore = {
	score: 10
}

const counterReducer = (state = initialStore, action) => {
	switch (action.type) {
		case 'INCR':
			return {...state, score: state.score + parseInt(action.payload)}
		case 'DECR':
			if (state.score === 0) return state
			return {...state, score: state.score - parseInt(action.payload)}
		case 'RESET':
			return initialStore
		default:
			return state
	}
}

export {counterReducer}