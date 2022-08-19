/* eslint-disable */
import {memo} from "react"
import {ImCheckmark, ImCheckmark2, ImCross} from "react-icons/im";
import {BsExclamationDiamond, BsExclamationDiamondFill} from "react-icons/bs";
import {FaLightbulb} from "react-icons/fa";
import './Todo.scss'

const Todo = ({index, todo, removeTodo, putTodo}) => {
	console.log("from todo")
	return (
		<div className={`
				todos__item todo
				${todo.completed ? 'todo_completed' : ''}
				${todo.important ? 'todo_important' : ''}
				${todo.wait ? 'todo_waiting' : ''}
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
					onClick={() => putTodo(todo._id, index, "completed")}
					type="button"
					className="btn btn_link todo__btn todo__btn_complete">
					{todo.completed
						? <ImCheckmark/>
						: <ImCheckmark2/>
					}
				</button>
				<button
					onClick={() => putTodo(todo._id, index, "important")}
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
					onClick={() => removeTodo(todo._id, index)}
					type="button"
					className="btn btn_link todo__btn todo__btn_delete">
					<ImCross/>
				</button>
			</div>
		</div>
	)
}

export default Todo