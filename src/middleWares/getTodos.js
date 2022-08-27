/* eslint-disable */
import {
	get,
	setError,
	setLoading,
} from '../store_rtk-slice/todos/todosReducerRTK'

export const getTodos = (vars, userId) => {
	
	const params = new URLSearchParams({
		id: userId
	})
	
	return function(dispatch) {
		dispatch(setLoading(true))
		fetch(`${vars.url}/api/todo?${params}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(res => res.json())
			.then(data => {
				dispatch(get(data))
			})
			.catch((e) => {
				console.log(e)
				dispatch(setError(true))
			})
			.finally(() => {
				dispatch(setLoading(false))
			})
	}
}