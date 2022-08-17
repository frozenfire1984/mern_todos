import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import {AuthProvider} from './context/AuthContext'
import {AppProvider} from './context/AppContext'

ReactDOM.render(
	<React.StrictMode>
		<AppProvider>
			<AuthProvider>
				<App/>
			</AuthProvider>
		</AppProvider>
	</React.StrictMode>,
	document.getElementById('root')
)