/* eslint-disable */
import React, {useState, useContext} from 'react'
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import {AppContext} from '../../context/AppContext'
import { BiUserPlus, BiLogIn } from "react-icons/bi";

import './AuthPage.scss'
import {body} from "express-validator";

const AuthPage = () => {
	
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
	
/*	const signupHandler = async () => {
		try {
			await fetch(`${vars.url}/api/auth/signup`, {
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
					history.push("/")
					console.log(data)
				})
				.catch((e) => {
					e.json().then((body) => {
						console.warn(body)
					})
				})
		} catch (e) {
			console.log(e)
		}
	}*/
	
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
		
					<div className="container">
						<div className="auth-page">

								<h3 className="auth-page__heading"><BiLogIn/> Sign in</h3>
								<form className="form form-login" onSubmit={e => e.preventDefault()}>
									<div className="row">
										<div className="input-field col s12">
											<input
												type="email"
												name="email"
												id="email"
												className="validate"
												onChange={changeHandler}
												tabIndex={1}
											/>
											<label htmlFor="email">Email</label>
										</div>
										<div className="input-field col s12">
											<input
												type="password"
												name="password"
												id="password"
												className="validate"
												onChange={changeHandler}
												tabIndex={2}
											/>
											<label htmlFor="password">Password</label>
										</div>
									</div>
									<div className="auth-page__buttons">
										<button
											type="button"
											onClick={signinHandler}
											className="waves-effect waves-light btn blue"
											tabIndex={3}>
											Sign in
										</button>
										{/*<Link
											to="/signup"
											className="btn-outline"
											tabIndex={4}>
											Sign Up
										</Link>*/}
									</div>
								</form>
							
								{/*<h3 className="auth-page__heading"><BiUserPlus /> Sign up</h3>
								<form className="form form-login" onSubmit={e => e.preventDefault()}>
									<div className="row">
										<div className="input-field col s12">
											<input
												type="email"
												name="email"
												id="email"
												className="validate"
												onChange={changeHandler}
												tabIndex={1}
											/>
											<label htmlFor="email">Email</label>
										</div>
										<div className="input-field col s12">
											<input
												type="password"
												name="password"
												id="password"
												className="validate"
												onChange={changeHandler}
												tabIndex={2}
											/>
											<label htmlFor="password">Password</label>
										</div>
									</div>
									<div className="auth-page__buttons">
										<button
											type="button"
											onClick={signupHandler}
											className="waves-effect waves-light btn blue"
											tabIndex={3}>
											Sign up
										</button>
										<Link
											to="/signin"
											className="btn-outline"
											tabIndex={4}>
											Already have account?
										</Link>
									</div>
								</form>*/}
							
						</div>
					</div>
				
	)
}

export default AuthPage