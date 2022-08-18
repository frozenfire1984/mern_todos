import {useState, useEffect, useCallback} from 'react'

type IData = {
	token: string,
	userId: string
}

type IOutput = {
	login: (jwtToken: string, id: string) => void,
	logout: () => void,
	token: string,
	userId: string,
	isReady: boolean,
	isLogin: boolean
}

export const useAuth = (): IOutput => {
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
		let data: IData | null = null
		
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