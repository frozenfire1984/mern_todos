import React, {useState, useContext, useEffect, FormEvent} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext, IAuth} from '../../context/AuthContext'
import {AppContext, IApp} from '../../context/AppContext'
import IPayload from '../../@type/payload'
import CustomError from './_customError'
import {BiLogIn} from 'react-icons/bi'
import './Auth.scss'

const Signin = () => {
	const {vars} = useContext(AppContext) as IApp
	const {login} = useContext(AuthContext) as IAuth
	
	const [isLoading, setIsLoading] = useState(false)
	
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	
	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [genericError, setGenericError] = useState('')
	
	const changeEmailHandler = (event: FormEvent<HTMLInputElement>) => {
		console.log('changeEmailHandler')
		setEmail((event.target as HTMLInputElement).value)
	}
	
	const changePasswordHandler = (event: FormEvent<HTMLInputElement>) => {
		console.log('changePasswordHandler')
		setPassword((event.target as HTMLInputElement).value)
	}
	
	useEffect(() => {
		return () => {
			setIsLoading(false)
			setEmail('')
			setPassword('')
			setPasswordError('')
			setEmailError('')
			setGenericError('')
		}
	}, [])
	
	const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
		console.log('submitHandler')
		event.preventDefault()
		setIsLoading(true)
		setEmailError('')
		setPasswordError('')
		setGenericError('')
		
		const payload:IPayload = {
			email: email,
			password: password
		}
		
		try {
			await fetch(`${vars.url}/api/auth/signin`, {
				method: 'POST',
				body: JSON.stringify(payload),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((res) => {
					if (res.status === 404) {
						throw new Error('Bad API url')
					}
					
					if (res.ok) {
						return res
					} else {
						return res.json().then(data => {
							const error = new CustomError('Bad request')
							error.error_msg = data
							throw error
						})
					}
				})
				.then((res) => {
					if (!res.headers.get('content-type')?.includes('application/json')) {
						const error = new CustomError('Error json parsing')
						error.response = res
						throw error
					}
					return res
				})
				.then(res => res.json())
				.then(data => {
					if (data.token && data.userId) {
						login(data.token, data.userId)
					} else {
						throw new Error('token or userId don\'t transfer')
					}
				})
				.catch((e) => {
					//console.log(e.name)
					//console.log(e.message)
					//console.log(e.fileName)
					//console.log(e.lineNumber)
					//console.log(e.error_msg)

					if (e.error_msg && e.error_msg.type === 'email') {
						setEmailError(e.error_msg.msg)
						return
					}
					
					if (e.error_msg && e.error_msg.type === 'password') {
						setPasswordError(e.error_msg.msg)
						return
					}
					
					if (e.message === 'Failed to fetch') {
						setGenericError('Error on server or db!')
					} else {
						setGenericError(e.message)
						console.log(e)
					}
				})
				.finally(() => setIsLoading(false))
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
				<form className={`form ${isLoading ? 'form_disabled' : ''}`} onSubmit={submitHandler}>
					<div className="form__row">
						<label htmlFor="email">Email</label>
						<input
							type={vars.debug_mode ? 'text' : 'email'}
							name="email"
							id="email"
							onChange={changeEmailHandler}
							value={email}
							tabIndex={1}
						/>
						{emailError && <div className="msg msg_error">{emailError}</div>}
					</div>
					<div className="form__row">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							id="password"
							onChange={changePasswordHandler}
							value={password}
							tabIndex={2}
						/>
						{passwordError && <div className="msg msg_error">{passwordError}</div>}
					</div>
					<div className="form__row form__row_controls">
						<button
							type="submit"
							className="btn"
							tabIndex={3}
							disabled={!(email && password)}
						>
							Sign in
						</button>
						<Link
							to="/signup"
							className="btn btn_wire"
							tabIndex={4}>
							Sign Up
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

export default Signin