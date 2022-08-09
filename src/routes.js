import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Main from './pages/Main/Main'
import Signin from './pages/Auth/Signin'

export const useRoutes = (isLogin) => {
	if (isLogin) {
		return (
			<Switch>
				<Route path="/" exact component={Main}/>
				<Redirect to="/"/>
			</Switch>
		)
	}

	return (
		<Switch>
			<Route path="/signin" exact component={Signin}/>
			<Redirect to="/signin"/>
		</Switch>
	)
}