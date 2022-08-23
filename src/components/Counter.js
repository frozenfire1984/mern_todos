/* eslint-disable */
import {useDispatch} from "react-redux";
import {useContext, useState} from "react"
import {AuthContext} from "../context/AuthContext"
import {addTodosAction, incrCounterAction, decrCounterAction, resetCounterAction} from "../store/"

const Counter = () => {
	const {userId} = useContext(AuthContext)
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
		dispatch(incrCounterAction(num))
		setIncrementVal(0)
	}
	
	const handlerDecrement = (num) => {
		dispatch(decrCounterAction(num))
		setDecrementVal(0)
	}
	
	const handlerReset = () => {
	  dispatch(resetCounterAction())
	}
	
	const handlerAddTodo = () => {
		
		const todo = {_id: new Date().getTime(),
			text: 'foo bar',
			owner: userId,
			completed: false,
			important: false}
		
		dispatch(addTodosAction(todo))
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
			<button onClick={() => handlerAddTodo()}>Add todo</button>
		</div>
	)
}

export default Counter