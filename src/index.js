import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {AuthProvider} from './context/AuthContext'
import {AppProvider} from './context/AppContext'
import TestProvider from './context/TestContext'
import './index.scss'

ReactDOM.render(
	<React.StrictMode>
		<AppProvider>
			<AuthProvider>
				<TestProvider>
					<App/>
				</TestProvider>
			</AuthProvider>
		</AppProvider>
	</React.StrictMode>,
	document.getElementById('root')
)