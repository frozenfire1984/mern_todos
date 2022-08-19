import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import {AuthProvider} from './context/AuthContext'
import {AppProvider} from './context/AppContext'
import {TodoProvider} from './context/TodoContext'

ReactDOM.render(
	<React.StrictMode>
		<AppProvider>
			<AuthProvider>
				<TodoProvider>
					<App/>
				</TodoProvider>
			</AuthProvider>
		</AppProvider>
	</React.StrictMode>,
	document.getElementById('root')
)