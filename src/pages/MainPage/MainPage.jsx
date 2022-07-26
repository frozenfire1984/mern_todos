/* eslint-disable */
import React, {useContext} from 'react'
import './MainPage.scss'
//import {Link} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'

const MainPage = () => {

  const {isLogin, userId} = useContext(AuthContext)

	return (
		<div>
			<h1>Main Page</h1>

      {isLogin.toString()}
      <br/>
      {userId}
		</div>
	)
}

export default MainPage