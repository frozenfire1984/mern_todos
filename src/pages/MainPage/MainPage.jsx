/* eslint-disable */
import React, {useContext, useState} from 'react'
import './MainPage.scss'
//import {Link} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios'
import './MainPage.scss'

const MainPage = () => {

	const {isLogin, userId} = useContext(AuthContext)

	const [text, setText] = useState("")

	const changeHandler = (event) => {
		setText(event.target.value)
	}

	const submitHandler = async () => {
		/*console.log({
			text: text,
			userId: userId
		})*/

		try {
			await axios.post("http://localhost:5000/api/todo/add",
				{
					text: text,
					userId: userId
				},
				{
					headers: {
						'Content-Type': 'application/json'
				}
			}).then(res => {
				console.log(res)
			}).catch(e => {
				throw new Error(e)
			})
		} catch (e) {
			console.log(e)
		}



	}

	return (
		<>
			<div className="container">
				<div className="main-page">
					<h4>Add Task</h4>
					<form className="form form-login" onSubmit={e => e.preventDefault()}>
						<div className="row">
							<div className="input-field col s12">
								<input
									type="text"
									id="input"
									name="input"
									className="validate"
									onChange={changeHandler}
								/>
								<label htmlFor="input">Task</label>
							</div>
						</div>
						<div className="row">
							<button onClick={submitHandler} className="waves-effect waves-light btn blue">Add</button>
						</div>
					</form>

					<h4>Active tasks</h4>
					<div className="todos">
						<div className="row todos__item">
							<div className="col todos__num">1</div>
							<div className="col todos__text">foo bar</div>
							<div className="col todos__btns">
								<button type="button" className="btn blue">check</button>
								<button type="button" className="btn orange">warning</button>
								<button type="button" className="btn red">delete</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default MainPage