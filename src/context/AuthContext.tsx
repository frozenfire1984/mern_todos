import React, {createContext, FC, ReactNode} from 'react'
import {useAuth} from '../hooks/useAuth'
import IAuth from '../@type/auth'

type TProps = {
	children: ReactNode
}

export const AuthContext = createContext<IAuth | null>(null)

export const AuthProvider: FC<TProps> = ({children}) => {
	const {login, logout, token, userId, isReady, isLogin} = useAuth()
	
	return <AuthContext.Provider value={{login, logout, token, userId, isReady, isLogin}}>
		{children}
	</AuthContext.Provider>
}

export {IAuth}

