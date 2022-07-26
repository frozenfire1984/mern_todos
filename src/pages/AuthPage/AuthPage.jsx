/* eslint-disable */
import React, {useState, useContext} from 'react'
import './AuthPage.scss'
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import axios from 'axios'
import {AuthContext} from '../../context/AuthContext'

const AuthPage = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const changeHandler = (event) => {
        //setForm({...form, [event.target.name]: event.target.value})
        //console.log(form)
        setForm({
            email: event.target.name === "email" ? event.target.value : form.email,
            password: event.target.name === "password" ? event.target.value : form.password,
        })
    }

    const {login, logout, token, userId, isReady, isLogin} = useContext(AuthContext)

    const signupHandler = async () => {
        //console.log("submit")
        try {
            await axios.post('http://localhost:5000/api/auth/signup', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((resp) => {
                    console.log(resp)
                    //return resp
                })
                .catch((e) => {
                    console.log(e.response.data.errors)
                    throw new Error(e.response.data.msg)
                })
        } catch (e) {
            //throw new Error(e)
            console.log(e)
        }
    }

    const signinHandler = async () => {
        //console.log("submit")
        try {
            console.log(form)
            await axios.post('http://localhost:5000/api/auth/signin', {...form}, {
                  headers: {
                      'Content-Type': 'application/json'
                  }
              })
              .then((resp) => {
                  //console.log(resp.data.token)
                  //console.log(resp.data.userId)
                  login(resp.data.token, resp.data.userId)
                  //return resp
              })
              .catch((e) => {
                  console.log(e.response.data.errors)
                  throw new Error(e.response.data.msg)
              })
        } catch (e) {
            //throw new Error(e)
            console.log(e)
        }
    }


    /*const changeHandler = (event) => {
        setForm({
            email: event.target.name === "email" ? event.target.value : form.email,
            password: event.target.name === "password" ? event.target.value : form.password,
        })
        console.log(form)
    }*/

    /*const [email, setEmail] = useState()

    const changeEmailHandler = (event) => {
        setEmail(email, event.target.value)
        console.log(event.target.name)
    }*/

    return (

        <BrowserRouter>
            <Switch>
                <>
                    <div className="container">
                        <div className="auth-page">
                            <Route path="/signin">
                                <h3>Sign in</h3>
                                <form className="form form-login" onSubmit={e => e.preventDefault()}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="validate"
                                                onChange={changeHandler}
                                                //value={form.email}
                                                //onChange={changeEmailHandler}
                                            />
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="input-field col s12">
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                className="validate"
                                                //value={form.password}
                                                onChange={changeHandler}
                                            />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button type="button" onClick={signinHandler} className="wawes-effect wawes-light btn blue">Sign in</button>
                                        {/*<a href="/signup" className="btn-outline btn-reg">Sign Up</a>*/}
                                        <Link to="/signup" className="btn-outline btn-reg">Sign Up</Link>
                                    </div>
                                </form>
                            </Route>

                            <Route path="/signup">
                                <h3>Sign up</h3>
                                <form className="form form-login" onSubmit={e => e.preventDefault()}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="validate"
                                                //value={form.email}
                                                onChange={changeHandler}
                                            />
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="input-field col s12">
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                className="validate"
                                                //value={form.password}
                                                onChange={changeHandler}
                                            />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button type="button" onClick={signupHandler} className="wawes-effect wawes-light btn blue">Sign up</button>
                                        {/*<a href="/signin" className="btn-outline btn-reg">Already have account?</a>*/}
                                        <Link to="/signin" className="btn-outline btn-reg">Already have account?</Link>
                                    </div>
                                </form>
                            </Route>
                        </div>
                    </div>
                </>
            </Switch>
        </BrowserRouter>


    )
}

export default AuthPage