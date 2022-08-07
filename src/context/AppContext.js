import {createContext} from 'react'

const vars = {
	url: 'http://localhost:5001',
}

const AppContext = createContext()

export {AppContext, vars}