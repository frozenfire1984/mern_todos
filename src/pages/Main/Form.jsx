/* eslint-disable */
import React, {useContext, useState} from "react";
import {TodoContext} from "../../context/TodoContext";

const Form = () => {
	const {addTodo} = useContext(TodoContext)
	const [text, setText] = useState("")
	
	const inputHandler = (e) => {
		setText(e.target.value)
	}
	
	const submitHandler = (e) => {
		e.preventDefault()
		setText("")
		addTodo(text)
	}
	
	return (
		<div className="container container_narrow">
			<h3 className="heading">Add Task</h3>
			<form className={`form`} onSubmit={submitHandler}>
				<div className="form__row">
					<input
						type="text"
						id="input"
						name="input"
						value={text}
						onChange={(e) => inputHandler(e)}
					/>
				</div>
				<div className="row">
					<button type="submit" className="btn" disabled={!text}>Add</button>
				</div>
			</form>
		</div>
	)
}

export default Form