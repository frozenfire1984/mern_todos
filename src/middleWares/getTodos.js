/* eslint-disable */
import {getTodosAction, setErrorTodosAction, switchTodosLoaderAction} from "../store/todos/todosActions"

export const getTodos = (userId, vars) => {
	
	const params = new URLSearchParams({
		id: userId
	})
	
	return function(dispatch) {
		dispatch(switchTodosLoaderAction(true))
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
				dispatch(switchTodosLoaderAction(false))
			})
	}
}