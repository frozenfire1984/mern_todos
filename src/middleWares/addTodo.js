/* eslint-disable */
import {
	add,
	setError,
	setLoadingAdding
} from "../store_rtk-slice/todos/todosReducerRTK"

export const addTodo = (vars, userId, text) => {
	
	const body = {
		text: text,
		userId: userId
	}
	
	return function(dispatch) {
		dispatch(setLoadingAdding(true))
		fetch(`${vars.url}/api/todo/add`,
			{
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(res => res.json())
			.then(data => {
				dispatch(add(data))
			})
			.catch((e) => {
				console.log(e)
				dispatch(setError(true))
			})
			.finally(() => {
				dispatch(setLoadingAdding(false))
			})
	}
}