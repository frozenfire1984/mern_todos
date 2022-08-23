/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import {AuthProvider} from './context/AuthContext'
import {AppProvider} from './context/AppContext'
import {TodoProvider} from './context/TodoContext'
import {createStore} from 'redux'
import {todosReducer} from './store/todos/todosReducer'
import {counterReducer} from "./store/counter/counterReducer";
import {Provider} from 'react-redux'
import {store} from "./store";




//const store = createStore(todosReducer)
//const counterStore = createStore(counterReducer)

ReactDOM.render(
	<React.StrictMode>
		<AppProvider>
			<AuthProvider>
				<TodoProvider>
					<Provider store={store}>
					<App/>
					</Provider>
				</TodoProvider>
			</AuthProvider>
		</AppProvider>
	</React.StrictMode>,
	document.getElementById('root')
)