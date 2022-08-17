import React, {createContext} from 'react'
import PropTypes from 'prop-types'
export const AppContext = createContext(null)

export const AppProvider = ({children}) => {
	const vars = {
		url: 'http://localhost:5001',
	}
	return <AppContext.Provider value={{vars}}>
		{children}
	</AppContext.Provider>
}

AppProvider.propTypes = {
	children: PropTypes.object.isRequired
}