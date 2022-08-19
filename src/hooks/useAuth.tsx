import {useState, useEffect} from 'react'
import IAuth from '../@type/auth'

interface ILocalStorage {
	token: string,
	userId: string
}

export const useAuth = ():IAuth => {
	const [token, setToken] = useState('')
	const [userId, setUserId] = useState('')
	const [isReady, setIsReady] = useState(false)
	const [isLogin, setIsLogin] = useState(false)

	const login = (jwtToken: string, id: string) => {
		setToken(jwtToken)
		setUserId(id)
		setIsReady(true)
		setIsLogin(true)
		localStorage.setItem('userData', JSON.stringify({
			userId: id,
			token: jwtToken
		}))
	}

	const logout = () => {
		setToken('')
		setUserId('')
		setIsReady(false)
		setIsLogin(false)
		localStorage.removeItem('userData')
	}

	useEffect(() => {
		let data: ILocalStorage | null = null
		
		const localStorage_str = localStorage.getItem('userData')
		
		if (localStorage_str) {
			data = JSON.parse(localStorage_str)
		}
		
		if (data && data.token) {
			login(data.token, data.userId)
		}
		setIsReady(true)
	}, [login])

	return {login, logout, token, userId, isReady, isLogin}
}

