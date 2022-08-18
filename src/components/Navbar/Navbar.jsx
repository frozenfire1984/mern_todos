/* eslint-disable */
import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'

import {FaUser} from "react-icons/fa";
import {BiLogIn, BiLogOut} from "react-icons/bi";

import './Navbar.scss'

const Navbar = () => {
	const {isLogin, logout} = useContext(AuthContext)
	
	return (
		<nav>
			<div className="header">
				<div className="header__app-name">Todo app</div>
				{isLogin &&
					<div className="header__username">
						<FaUser/> Username
					</div>
				}
				<ul className="header__nav nav">
					<li>
						<Link to="/">
							&bull; Main
						</Link>
					</li>
					<li>
						<Link to="/test">
							&bull; Test
						</Link>
					</li>
					{isLogin &&
						<li>
							<Link to="/info">
								&bull; Info
							</Link>
						</li>
					}
					
					{isLogin
						?
						<li>
							<a onClick={logout}>
								<BiLogOut/>
								Sign out
							</a>
						</li>
						:
						<li>
							<Link to="/signin">
								<BiLogIn/>
								Sign in
							</Link>
						</li>
					}
				</ul>
			</div>
		</nav>
	)
}

export default Navbar