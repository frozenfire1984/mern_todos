/* eslint-disable */
import {
	addTodoAction, removeTodoAction, setErrorTodosAction,
	setLoaderAddingTodosAction
} from "../store/"
import {putTodoAction} from "../store/todos/todosActions"

export const putTodo = (vars, id, index, type) => {
	
	const params = new URLSearchParams({
		type: type,
	})
	
	const body = {
		id: id
	}
	
	return function(dispatch) {
		//dispatch(setLoaderAddingTodosAction(true))
		fetch(`${vars.url}/api/todo/?${params}`,
			{
				method: 'PUT',
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(res => res.json())
			.then(data => {
				dispatch(putTodoAction({data: data, index: index}))
			})
			.catch((e) => {
				console.log(e)
				dispatch(setErrorTodosAction(true))
			})
			.finally(() => {
				//dispatch(setLoaderAddingTodosAction(false))
			})
	}
}