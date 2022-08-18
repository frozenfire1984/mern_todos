import React, {createContext} from 'react'
import PropTypes from 'prop-types'
import {useAuth} from '../hooks/auth.hook'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
	const {login, logout, token, userId, isReady, isLogin} = useAuth()
	//const isLogin = !!token
	
	return <AuthContext.Provider value={{login, logout, token, userId, isReady, isLogin}}>
		{children}
	</AuthContext.Provider>
}

AuthProvider.propTypes = {
	children: PropTypes.object.isRequired
}