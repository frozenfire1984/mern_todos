/* eslint-disable */
import React, {useContext} from 'react'
import './Navbar.scss'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'

const Navbar = () => {
    const {isLogin, logout} = useContext(AuthContext)

    return (
        <nav>
            <div className="nav-wrapper navbar blue">
                <a href="/" className="brand-logo">Todo app</a>
                {/*<span>{isLogin.toString()}</span>*/}
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {
                        isLogin
                        ?
                          <li>
                              <a onClick={logout}>Sign out</a>
                          </li>
                        :
                          <li>
                              <Link to="/signin">Sign in</Link>
                          </li>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar