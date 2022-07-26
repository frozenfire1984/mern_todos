/* eslint-disable */
import React, {useState} from 'react'
import './styles/app.scss'
import Navbar from "./components/Navbar/Navbar";
//import AuthPage from "./pages/AuthPage/AuthPage";
import {BrowserRouter} from 'react-router-dom'
import {useRoutes} from './routes'
import {AuthContext} from './context/AuthContext'
import {useAuth} from "./hooks/auth.hook"






function App() {
	const {login, logout, token, userId, isReady} = useAuth()
  const isLogin = !!token



  function AppRoutes() {
    return useRoutes(isLogin)
  }

	return (
		<AuthContext.Provider value={{login, logout, token, userId, isReady, isLogin}}>
			<div className="app">
				<BrowserRouter>
					<Navbar/>
					<AppRoutes/>
				</BrowserRouter>
			</div>
		</AuthContext.Provider>

	);
}

export default App;
