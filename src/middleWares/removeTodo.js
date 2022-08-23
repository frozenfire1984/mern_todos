/* eslint-disable */
import {
	addTodoAction, removeTodoAction, setErrorTodosAction,
	setLoaderAddingTodosAction
} from "../store/"

export const removeTodo = (vars, id) => {
	
	const params = new URLSearchParams({
		id: id,
		some: 'foo bar'
	})
	
	return function(dispatch) {
		//dispatch(setLoaderAddingTodosAction(true))
		fetch(`${vars.url}/api/todo/?${params}`,
			{
				method: 'DELETE',
				/*headers: {
					'Content-Type': 'application/json'
				}*/
			})
			.then(res => res.json())
			.then(() => {
				dispatch(removeTodoAction(id))
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