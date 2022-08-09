/* eslint-disable */
import React, {useState, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import {AppContext} from '../../context/AppContext'
import {BiUserPlus} from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";


import './Auth.scss'

const AuthPage = () => {
	const { vars } = useContext(AppContext)
	const navigate = useNavigate()
	
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
					navigate("/signin")
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
	}
	
	return (
		<div className="container container_narrow">
			<div className="auth-page">
				<h2 className="auth-page__heading heading">
					<FaUserPlus/> Sign up
				</h2>
				<form className="form form-login" onSubmit={e => e.preventDefault()}>
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
							onClick={signupHandler}
							className="btn"
							tabIndex={3}>
							Sign up
						</button>
						<Link
							to="/signin"
							className="btn btn_wire"
							tabIndex={4}>
							Already have account?
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AuthPage