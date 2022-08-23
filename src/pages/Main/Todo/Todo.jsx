/* eslint-disable*/
import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {ImCheckmark, ImCheckmark2, ImCross} from 'react-icons/im'
import {BsExclamationDiamond, BsExclamationDiamondFill} from 'react-icons/bs'
import {FaLightbulb} from 'react-icons/fa'
import './Todo.scss'
import {useDispatch} from "react-redux"
import {AuthContext} from "../../../context/AuthContext"
import {AppContext} from "../../../context/AppContext"
import {removeTodo} from "../../../middleWares/removeTodo"
import {putTodo} from "../../../middleWares/putTodo"

const Todo = ({index, todo}) => {
	const [wait, setWait] = useState(false)
	const [prevCompleted, setPrevCompleted] = useState(todo.completed)
	const [prevImportant, setPrevImportant] = useState(todo.important)

	const {vars} = useContext(AppContext)
	
	const dispatch = useDispatch()
	
	const putHandler = (type) => {
		dispatch(putTodo(vars, todo._id, index, type))
	}
	
	const removeHandler = () => {
		dispatch(removeTodo(vars, todo._id, index))
	}
	
	const waitHandler = () => {
		setWait(true)
		setPrevCompleted(todo.completed)
		setPrevImportant(todo.important)
	}
	
	useEffect(() => {
		if (prevCompleted !== todo.completed) {
			setWait(false)
		}
		
		if (prevImportant !== todo.important) {
			setWait(false)
		}
		
		/*console.log('index:' + index)
		console.log('completed_old:' + prevCompleted)
		console.log('todo.completed:' + todo.completed)
		console.log('-------------------------')*/
		
		return () => {
			setWait(false)
		}
	},[todo])
	
	return (
		<div className={`
				todos__item todo
				${todo.completed ? 'todo_completed' : ''}
				${todo.important ? 'todo_important' : ''}
				${wait ? 'todo_waiting' : ''}
			`}>
			
			{todo.important && <FaLightbulb className="todo__icon-mark"/>}
			<div className="todo__cell todo__cell_num">
				<div className="todo__num-val">
					{index + 1}
				</div>
			</div>
			<div className="todo__cell todo__cell_content">
				{todo.text}
			</div>
			<div className="todo__cell todo__cell_controls">
				<button
					onClick={() => {putHandler('completed'); waitHandler()}}
					type="button"
					className="btn btn_link todo__btn todo__btn_complete">
					{todo.completed
						? <ImCheckmark/>
						: <ImCheckmark2/>
					}
				</button>
				<button
					onClick={() => {putHandler('important'); waitHandler()}}
					type="button"
					className={`
						btn btn_link
						todo__btn todo__btn_mark
						${todo.completed ? 'btn_disabled' : ''}
					`}>
					{todo.important
						? <BsExclamationDiamondFill/>
						: <BsExclamationDiamond/>
					}
				</button>
				<button
					onClick={() => {removeHandler(); waitHandler()}}
					type="button"
					className="btn btn_link todo__btn todo__btn_delete">
					<ImCross/>
				</button>
			</div>
		</div>
	)
}

Todo.propTypes = {
	index: PropTypes.number.isRequired,
	todo: PropTypes.object.isRequired,
	_id: PropTypes.string,
	//removeTodo: PropTypes.func.isRequired,
	//putTodo: PropTypes.func.isRequired
}

export default Todo