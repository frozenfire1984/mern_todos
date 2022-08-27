/* eslint-disable */
import {
	put,
	setError
} from "../store_rtk-slice/todos/todosReducerRTK"

export const putTodo = (vars, id, index, type) => {
	
	const params = new URLSearchParams({
		type: type,
	})
	
	const body = {
		id: id
	}
	
	return function(dispatch) {
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
				dispatch(put({data: data, index: index}))
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