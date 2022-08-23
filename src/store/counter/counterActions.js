/* eslint-disable */
export const INCR = 'INCR'
export const DECR = 'DECR'
export const RESET = 'RESET'

export const incrCounterAction = (payload) => {
	return {
		type: INCR,
		payload: payload
	}
}

export const decrCounterAction = (payload) => {
	return {
		type: DECR,
		payload: payload
	}
}

export const resetCounterAction = (payload) => {
	return {
		type: RESET,
		payload: payload
	}
}