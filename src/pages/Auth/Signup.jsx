/* eslint-disable */
import React, {useState, useContext, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import {AppContext} from '../../context/AppContext'
import {FaUserPlus} from "react-icons/fa";
import './Auth.scss'


const AuthPage = () => {
	const debug_mode = true
	
	const {vars} = useContext(AppContext)
	const navigate = useNavigate()
	
	const [isLoading, setIsLoading] = useState(false)
	
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	
	const [emailErrors, setEmailErrors] = useState([])
	const [passwordErrors, setPasswordErrors] = useState([])
	const [genericError, setGenericError] = useState("")
	
	const changeEmailHandler = (event) => {
		console.log("changeEmailHandler")
		setEmail(event.target.value)
	}
	
	const changePasswordHandler = (event) => {
		console.log("changePasswordHandler")
		setPassword(event.target.value)
	}
	
	useEffect(() => {
		return () => {
			setIsLoading(false)
			setEmail("")
			setPassword("")
			setEmailErrors([])
			setPasswordErrors([])
			setGenericError("")
		}
	}, [])
	
	const {login, logout, token, userId, isReady, isLogin} = useContext(AuthContext)
	
	const signupHandler = async (event) => {
		console.log("signupHandler")
		event.preventDefault()
		setIsLoading(true)
		setEmailErrors("")
		setPasswordErrors([])
		setGenericError("")
		
		try {
			await fetch(`${vars.url}/api/auth/signup`, {
				method: "POST",
				body: JSON.stringify({
					email: email,
					password: password
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((res) => {
					if (res.status === 404) {
						throw new Error("Bad API url")
					}
					
					if (res.ok) {
						return res;
					} else {
						return res.json().then(data => {
							let error = new Error('Bad request')
							error.error_msg = data
							throw error
						})
					}
				})
				.then((res) => {
					if (!res.headers.get('content-type')?.includes('application/json')) {
						let error = new Error('Error json parsing');
						error.response = res;
						throw error
					}
					return res;
				})
				.then(res => res.json())
				.then(data => {
					console.log(data)
					navigate("/signin")
				})
				.catch((e) => {
					//console.log(e.name)
					//console.log(e.message)
					console.log(e.error_msg)
					if (e.error_msg && e.error_msg.errors && e.error_msg.type === "express-validator") {
						const password_errors_list = e.error_msg.errors.reduce((collector, item) => {
							if (item.param === "password") {
								collector.push(item.msg)
							}
							return collector
						}, [])
						setPasswordErrors(password_errors_list)
						
						const email_errors_list = e.error_msg.errors.reduce((collector, item) => {
							if (item.param === "email") {
								collector.push(item.msg)
							}
							return collector
						}, [])
						setEmailErrors(email_errors_list)
						
						return;
					}
					
					if (e.message === 'Failed to fetch') {
						setGenericError('Error on server or db!')
					} else {
						setGenericError(e.message)
						console.log(e)
					}
				})
				.finally(() => setIsLoading(false));
		} catch (e) {
			console.log(e)
		}
	}
	
	return (
		<div className="container container_narrow">
			<div className="auth-page">
				<h2 className="auth-page__heading heading">
					<FaUserPlus/> Sign up
				</h2>
				<form className="form form-login" onSubmit={signupHandler}>
					<div className="form__row">
						<label htmlFor="email">Email</label>
						<input
							type={debug_mode ? 'text' : 'email'}
							name="email"
							id="email"
							onChange={changeEmailHandler}
							tabIndex={1}
						/>
						{emailErrors && emailErrors.map((item, index) => {
							return (
								<div key={index} className="msg msg_error">{item}</div>
							)})
						}
					</div>
					<div className="form__row">
						<label htmlFor="password">Password</label>
						<input
							type={debug_mode ? 'text' : 'password'}
							name="password"
							id="password"
							onChange={changePasswordHandler}
							tabIndex={2}
						/>
						{debug_mode && <code>debug: {password.length}</code>}
						{passwordErrors && passwordErrors.map((item, index) => {
							return (
								<div key={index} className="msg msg_error">{item}</div>
							)})
						}
						<details style={{marginTop: 10}}>
							<summary>Password requirements:</summary>
							<div className="form__field-note">
								<p>Password must be match by next requirements:</p>
								<ul>
									<li>must be at least 10 chars long</li>
									<li>must be at max 20 chars long</li>
									<li>must contain a least 2 number</li>
									<li>must contain a least 3 uppercase symbol</li>
									<li>must contain a least 2 special symbol</li>
								</ul>
								<p>For example: lorem12BAR$#</p>
							</div>
						</details>
						
					</div>
					<div className="form__row form__row_controls">
						<button
							type="submit"
							className="btn"
							tabIndex={3}
							disabled={!(email && password)}>
							Sign up
						</button>
						<Link
							to="/signin"
							className="btn btn_wire"
							tabIndex={4}>
							Already have account?
						</Link>
					</div>
					{genericError &&
						<div className="form__row">
							<div className="msg msg_error">{genericError}</div>
						</div>
					}
					<div className="form__row">
						{isLoading && <div className="loading">loader...</div>}
					</div>
				</form>
			</div>
		</div>
	)
}

export default AuthPage