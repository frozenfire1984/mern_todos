/* eslint-disable */
import {useDispatch} from "react-redux";
import {useState} from "react";

const Counter = () => {
	const dispatch = useDispatch()
	const [incrementVal, setIncrementVal] = useState(0)
	const [decrementVal, setDecrementVal] = useState(0)
	
	const handlerChangeIncrement = (e) => {
		setIncrementVal(Number(e.target.value))
	}
	
	const handlerChangeDecrement = (e) => {
		setDecrementVal(Number(e.target.value))
	}
	
	
	const handlerIncrement = (num) => {
		dispatch({
			type: 'INCR',
			payload: num
		})
		setIncrementVal(0)
	}
	
	const handlerDecrement = (num) => {
		dispatch({
			type: 'DECR',
			payload: num
		})
		setDecrementVal(0)
	}
	
	const handlerReset = () => {
	  dispatch({
			type: 'RESET',
			payload: null
		})
	}
	
	return (
		<div>
			<input
				type="range"
				value={incrementVal}
				onChange={(e) => handlerChangeIncrement(e)}
				placeholder={'increment'}/>
			{incrementVal}
			<button
				disabled={!incrementVal}
				onClick={() => handlerIncrement(incrementVal)}>
				Increment
			</button>
			
			<hr/>
			
			<input
				type="range"
				value={decrementVal}
				onChange={(e) => handlerChangeDecrement(e)}
				placeholder={'decrement'}/>
			{decrementVal}
			<button
				disabled={!decrementVal}
				onClick={() => handlerDecrement(decrementVal)}>
				Decrement
			</button>
			<hr/>
			<button onClick={handlerReset}>Reset</button>
			<hr/>
			<br/>
		</div>
	)
}

export default Counter