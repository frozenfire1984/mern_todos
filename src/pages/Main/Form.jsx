/* eslint-disable */
import React, {useContext, useState} from "react";
import {TodoContext} from "../../context/TodoContext";
import {useDispatch, useSelector} from "react-redux"
import {addTodo} from "../../middleWares/addTodo"
import {AuthContext} from "../../context/AuthContext"
import {AppContext} from "../../context/AppContext"

const Form = () => {
	const {isLogin, userId, isReady} = useContext(AuthContext)
	const {vars} = useContext(AppContext)
	const dispatch = useDispatch()
	const {loadingAdding} = useSelector(store => store.todos_rtk)
	const [text, setText] = useState("")
	
	const inputHandler = (e) => {
		setText(e.target.value)
	}
	
	const submitHandler = (e) => {
		e.preventDefault()
		setText("")
		dispatch(addTodo(vars, userId, text))
	}
	
	return (
		<div className="container container_narrow">
			<h3 className="heading">Add Task</h3>
			<form className={`form ${loadingAdding ? 'form_disabled' : ''}`} onSubmit={submitHandler}>
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
						{loadingAdding && <div>sending...</div>}
					</div>
				</div>
			</form>
		</div>
	)
}

export default Form