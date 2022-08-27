/* eslint-disable */
import {
	remove,
	setError
} from "../store_rtk-slice/todos/todosReducerRTK"

export const removeTodo = (vars, id) => {
	
	const params = new URLSearchParams({
		id: id,
		some: 'foo bar'
	})
	
	return function(dispatch) {
		fetch(`${vars.url}/api/todo/?${params}`,
			{
				method: 'DELETE',
				/*headers: {
					'Content-Type': 'application/json'
				}*/
			})
			.then(res => res.json())
			.then(() => {
				dispatch(remove(id))
			})
			.catch((e) => {
				console.log(e)
				dispatch(setError(true))
			})
			.finally(() => {
				//dispatch(setLoaderAddingTodosAction(false))
			})
	}
}