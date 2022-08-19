import React, {memo} from 'react'
import PropTypes from 'prop-types'
import {ImCheckmark, ImCheckmark2, ImCross} from 'react-icons/im'
import {BsExclamationDiamond, BsExclamationDiamondFill} from 'react-icons/bs'
import {FaLightbulb} from 'react-icons/fa'

import './Todo.scss'

const Todo = ({index, item, put, remove}) => {
	console.log('from todo')
	return (
		<div id={`todo-id-${item._id}`} className={`
				todos__item todo
				${item.completed ? 'todo_completed' : ''}
				${item.important ? 'todo_important' : ''}
			`}>
			{item.important && <FaLightbulb className="todo__icon-mark"/>}
			<div className="todo__cell todo__cell_num">
				<div className="todo__num-val">
					{index + 1}
				</div>
			</div>
			<div className="todo__cell todo__cell_content">{item.text}</div>
			<div className="todo__cell todo__cell_controls">
				<button
					onClick={() => put(item._id, index, 'completed')}
					type="button"
					className="btn btn_link todo__btn todo__btn_complete">
					{item.completed
						? <ImCheckmark/>
						: <ImCheckmark2/>
					}
				</button>
				<button
					onClick={() => put(item._id, index, 'important')}
					type="button"
					className={`
						btn btn_link
						todo__btn todo__btn_mark
						${item.completed ? 'btn_disabled' : ''}
					`}>
					{item.important
						? <BsExclamationDiamondFill/>
						: <BsExclamationDiamond/>
					}
				</button>
				<button
					onClick={() => remove(item._id, index)}
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
	item: PropTypes.object.isRequired,
	_id: PropTypes.string,
	remove: PropTypes.func.isRequired,
	put: PropTypes.func.isRequired
}

export default memo(Todo)