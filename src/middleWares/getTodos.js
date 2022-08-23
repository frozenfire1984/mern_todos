/* eslint-disable */
import {
	getTodosAction,
	setErrorTodosAction,
	setLoaderTodosAction,
} from "../store/"

export const getTodos = (userId, vars) => {
	
	const params = new URLSearchParams({
		id: userId
	})
	
	return function(dispatch) {
		dispatch(setLoaderTodosAction(true))
		fetch(`${vars.url}/api/todo?${params}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(res => res.json())
			.then(data => {
				dispatch(getTodosAction(data))
			})
			.catch((e) => {
				console.log(e)
				dispatch(setErrorTodosAction(true))
			})
			.finally(() => {
				dispatch(setLoaderTodosAction(false))
			})
	}
}