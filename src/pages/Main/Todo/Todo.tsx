import React, {useState, useEffect, memo} from 'react'
import {ImCheckmark, ImCheckmark2, ImCross} from 'react-icons/im'
import {BsExclamationDiamond, BsExclamationDiamondFill} from 'react-icons/bs'
import {FaLightbulb} from 'react-icons/fa'
import ITodo from '../../../@type/todo'
import './Todo.scss'

interface ITodoProps {
	todo: ITodo,
	putTodo: (id: string, index: number, action_type: string) => void,
	removeTodo: (id: string, index: number) => void,
	index: number
}

const Todo = ({todo, putTodo, removeTodo, index}: ITodoProps) => {
	const [wait, setWait] = useState(false)

	const [prevCompleted, setPrevCompleted] = useState(todo.completed)
	const [prevImportant, setPrevImportant] = useState(todo.important)
	
	const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
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
			<div className="todo__cell todo__cell_content">{todo.text}</div>
			<div className="todo__cell todo__cell_controls">
				<button
					onClick={(event) => {putTodo(todo._id, index, 'completed'); clickHandler(event)}}
					type="button"
					className="btn btn_link todo__btn todo__btn_complete">
					{todo.completed
						? <ImCheckmark/>
						: <ImCheckmark2/>
					}
				</button>
				<button
					onClick={(event) => {putTodo(todo._id, index, 'important'); clickHandler(event)}}
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
					onClick={(event) => {removeTodo(todo._id, index); clickHandler(event)}}
					type="button"
					className="btn btn_link todo__btn todo__btn_delete">
					<ImCross/>
				</button>
			</div>
		</div>
	)
}

export default memo(Todo)