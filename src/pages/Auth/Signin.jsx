/* eslint-disable */
import React, {useState, useContext} from 'react'
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import {AppContext} from '../../context/AppContext'
import {BiLogIn} from "react-icons/bi";

import './Auth.scss'

const Signin = () => {
	
	const {vars} = useContext(AppContext)
	
	const [form, setForm] = useState({
		email: "",
		password: ""
	})
	
	const changeHandler = (event) => {
		//setForm({...form, [event.target.name]: event.target.value})
		setForm({
			email: event.target.name === "email" ? event.target.value : form.email,
			password: event.target.name === "password" ? event.target.value : form.password,
		})
	}
	
	const {login, logout, token, userId, isReady, isLogin} = useContext(AuthContext)
	
	const signinHandler = async () => {
		try {
			await fetch(`${vars.url}/api/auth/signin`, {
				method: "POST",
				body: JSON.stringify(form),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((res) => {
					if (!res.ok) {
						throw res
					}
					return res.json()
				})
				.then((data) => {
					login(data.token, data.userId)
				})
				.catch((e) => {
					e.json().then((body) => {
						console.warn(body)
					})
				})
		} catch (e) {
			console.log(e)
		}
	}
	
	return (
		<div className="container container_narrow">
			<div className="auth-page">
				<h2 className="auth-page__heading heading">
					<BiLogIn/> Sign in
				</h2>
				<form className="form" onSubmit={e => e.preventDefault()}>
					<div className="form__row">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							id="email"
							onChange={changeHandler}
							tabIndex={1}
						/>
					</div>
					<div className="form__row">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							id="password"
							onChange={changeHandler}
							tabIndex={2}
						/>
					</div>
					<div className="form__row form__row_controls">
						<button
							type="button"
							onClick={signinHandler}
							className="btn"
							tabIndex={3}>
							Sign in
						</button>
						<Link
							to="/signup"
							className="btn btn_wire"
							tabIndex={4}>
							Sign Up
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Signin
