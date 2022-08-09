/* eslint-disable */
import React, {memo} from 'react'
import {ImCheckmark, ImCheckmark2, ImCross} from "react-icons/im";
import {BsExclamationDiamond, BsExclamationDiamondFill} from "react-icons/bs";
import {FaLightbulb} from "react-icons/fa";

import './Todo.scss'

const Todo = (props) => {
	return (
		<div className={`
				todos__item todo
				${props.item.completed ? 'todo_completed' : ''}
				${props.item.important ? 'todo_important' : ''}
			`}>
			{props.item.important && <FaLightbulb className="todo__icon-mark"/>}
			<div className="todo__num">{props.index + 1}</div>
			<div className="todo__content">{props.item.text}</div>
			<div className="todo__controls">
				<button
					onClick={() => props.put(props.item._id, props.index, "completed")}
					type="button"
					className="btn btn_link todo__btn todo__btn_complete">
					{props.item.completed
						? <ImCheckmark/>
						: <ImCheckmark2/>
					}
				</button>
				<button
					onClick={() => props.put(props.item._id, props.index, "important")}
					type="button"
					className="btn btn_link todo__btn todo__btn_mark">
					{props.item.important
						? <BsExclamationDiamondFill/>
						: <BsExclamationDiamond/>
					}
				</button>
				<button
					onClick={() => props.remove(props.item._id, props.index)}
					type="button"
					className="btn btn_link todo__btn todo__btn_delete">
					<ImCross/>
				</button>
			</div>
		</div>
	)
}

export default memo(Todo)