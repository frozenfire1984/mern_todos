/* eslint-disable */
import React, {useState, useContext} from 'react'
import './AuthPage.scss'
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import axios from 'axios'
import {AuthContext} from '../../context/AuthContext'

const AuthPage = () => {
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
	
	const signupHandler = async () => {
		try {
			/*await axios.post('http://localhost:5001/api/auth/signup', {...form}, {
					headers: {
							'Content-Type': 'application/json'
					}
			})
				.then(data => {
					console.log(data)
				})*/
			await fetch('http://localhost:5001/api/auth/signup', {
				method: "POST",
				body: JSON.stringify(form),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(res => res.json())
				.then((data) => {
					console.log(data)
				})
				.catch((e) => {
					console.log(e.response.data.errors)
					throw new Error(e.response.data.msg)
				})
		} catch (e) {
			console.error(e)
			
		}
	}
	
	const signinHandler = async () => {
		try {
			/*await axios.post('http://localhost:5001/api/auth/signin', {...form}, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(res => {
					login(res.data.token, res.data.userId)
				})*/
			
			await fetch('http://localhost:5001/api/auth/signin', {
				method: "POST",
				body: JSON.stringify(form),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(res => res.json())
				.then((data) => {
					login(data.token, data.userId)
				})
				.catch((e) => {
					console.log(e.response.data.errors)
					throw new Error(e.response.data.msg)
				})
		} catch (e) {
			//throw new Error(e)
			console.log(e)
		}
	}
	
	/*const changeHandler = (event) => {
			setForm({
					email: event.target.name === "email" ? event.target.value : form.email,
					password: event.target.name === "password" ? event.target.value : form.password,
			})
			console.log(form)
	}*/
	
	/*const [email, setEmail] = useState()

	const changeEmailHandler = (event) => {
			setEmail(email, event.target.value)
			console.log(event.target.name)
	}*/
	
	return (
		
		<BrowserRouter>
			<Switch>
				<>
					<div className="container">
						<div className="auth-page">
							<Route path="/signin">
								<h3>Sign in</h3>
								<form className="form form-login" onSubmit={e => e.preventDefault()}>
									<div className="row">
										<div className="input-field col s12">
											<input
												type="email"
												name="email"
												id="email"
												className="validate"
												onChange={changeHandler}
												//value={form.email}
												//onChange={changeEmailHandler}
											/>
											<label htmlFor="email">Email</label>
										</div>
										<div className="input-field col s12">
											<input
												type="password"
												name="password"
												id="password"
												className="validate"
												//value={form.password}
												onChange={changeHandler}
											/>
											<label htmlFor="password">Password</label>
										</div>
									</div>
									<div className="row flex">
										<div className="col">
											<button
												type="button"
												onClick={signinHandler}
												className="wawes-effect wawes-light btn blue">
												Sign in
											</button>
										</div>
										<div className="col">
											<Link to="/signup" className="btn-outline btn-reg">Sign Up</Link>
										</div>
									</div>
								</form>
							</Route>
							
							<Route path="/signup">
								<h3>Sign up</h3>
								<form className="form form-login" onSubmit={e => e.preventDefault()}>
									<div className="row">
										<div className="input-field col s12">
											<input
												type="email"
												name="email"
												id="email"
												className="validate"
												//value={form.email}
												onChange={changeHandler}
											/>
											<label htmlFor="email">Email</label>
										</div>
										<div className="input-field col s12">
											<input
												type="password"
												name="password"
												id="password"
												className="validate"
												//value={form.password}
												onChange={changeHandler}
											/>
											<label htmlFor="password">Password</label>
										</div>
									</div>
									<div className="row flex">
										<div className="col">
											<button
												type="button"
												onClick={signupHandler}
												className="wawes-effect wawes-light btn blue">
												Sign up
											</button>
										</div>
										<div className="col">
											<Link to="/signin" className="btn-outline btn-reg">Already have account?</Link>
										</div>
									</div>
								</form>
							</Route>
						</div>
					</div>
				</>
			</Switch>
		</BrowserRouter>
	)
}

export default AuthPage