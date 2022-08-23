/* eslint-disable */
import {
	addTodoAction, setErrorTodosAction,
	setLoaderAddingTodosAction
} from "../store/"

export const addTodo = (userId, text, vars) => {
	
	const body = {
		text: text,
		userId: userId
	}
	
	return function(dispatch) {
		dispatch(setLoaderAddingTodosAction(true))
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
				dispatch(addTodoAction(data))
			})
			.catch((e) => {
				console.log(e)
				dispatch(setErrorTodosAction(true))
			})
			.finally(() => {
				dispatch(setLoaderAddingTodosAction(false))
			})
	}
}