/* eslint-disable */
import {useDispatch} from "react-redux";

const Counter = () => {
	const dispatch = useDispatch()
	
	const handleIncrement = () => {
		dispatch({
			type: 'INCR',
			payload: 1
		})
	}
	
	const handleDecrement = () => {
		dispatch({
			type: 'DECR',
			payload: 1
		})
	}
	
	const handleReset = () => {
	  dispatch({
			type: 'RESET',
			payload: null
		})
	}
	
	return (
		<div>
			<button onClick={handleIncrement}>Increment</button>
			<button onClick={handleDecrement}>Decrement</button>
			<button onClick={handleReset}>Reset</button>
		</div>
	)
}

export default Counter