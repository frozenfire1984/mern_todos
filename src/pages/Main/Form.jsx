/* eslint-disable */
import React, {useContext, useState} from "react";
import {TodoContext} from "../../context/TodoContext";

const Form = () => {
	const {addTodo, loaderAdding} = useContext(TodoContext)
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
			<form className={`form ${loaderAdding ? 'form_disabled' : ''}`} onSubmit={submitHandler}>
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
				<div className="row">
					<div className="loader-holder">
						{loaderAdding && <div>sending...</div>}
					</div>
				</div>
			</form>
		</div>
	)
}

export default Form