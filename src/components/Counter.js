/* eslint-disable */
import {useDispatch, useSelector} from 'react-redux'
import {useContext, useState} from "react"
import {AuthContext} from "../context/AuthContext"
//import {incrCounterAction, decrCounterAction, resetCounterAction} from "../store/counter/counterActions"
import {
	increment,
	incrementCustom,
	decrement,
	decrementCustom,
	reset} from '../store_rtk-slice/counter/counterReducerRTK'

const Counter = () => {

	const score = useSelector(store => store.counter_rtk.score)

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
		dispatch(incrementCustom(num))
		setIncrementVal(0)
	}
	
	const handlerDecrement = (num) => {
		dispatch(decrementCustom(num))
		setDecrementVal(0)
	}
	
	const handlerReset = () => {
	  dispatch(reset())
	}


	

	
	return (
		<div>
			{/*<input
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
			<p>Score: {score}</p>*/}
			<button onClick={() => dispatch(increment())}>+</button>
			<button onClick={() => dispatch(decrement())}>-</button>

			<p>increment with custom values:</p>
			<input
				type="range"
				value={incrementVal}
				onChange={(e) => handlerChangeIncrement(e)}
				placeholder={'increment'}/>
			{incrementVal}
			<button
				disabled={!incrementVal}
				onClick={() => handlerIncrement(incrementVal)}>
				Increment +
			</button>
			<br/>
			<input
				type="range"
				value={decrementVal}
				onChange={(e) => handlerChangeDecrement(e)}
				placeholder={'decrement'}/>
			{decrementVal}
			<button
				disabled={!decrementVal}
				onClick={() => handlerDecrement(decrementVal)}>
				Decrement -
			</button>
			<br/>
			<button onClick={handlerReset}>Reset</button>
			<hr/>
			{score}

		</div>
	)
}

export default Counter