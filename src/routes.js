import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage'
import AuthPage from './pages/AuthPage/AuthPage'

export const useRoutes = (isLogin) => {
	if (isLogin) {
		return (
			<Switch>
				<Route path="/" exact component={MainPage}/>
				<Redirect to="/"/>
			</Switch>
		)
	}

	return (
		<Switch>
			<Route path="/signin" exact component={AuthPage}/>
			<Redirect to="/signin"/>
		</Switch>
	)
}