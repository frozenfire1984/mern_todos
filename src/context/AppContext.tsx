import React, {createContext, FC, ReactNode} from 'react'

type TProps = {
	children: ReactNode
}

interface IVars {
	url: string,
	debug_mode: boolean,
	test_value?: string
}

export interface IApp {
	vars: IVars
}

export const AppContext = createContext<IApp | null>(null)

export const AppProvider: FC<TProps> = ({children}) => {
	const vars: IVars = {
		url: 'http://localhost:5001',
		debug_mode: true,
		test_value: 'foo bar',
	}
	
	return <AppContext.Provider value={{vars}}>
		{children}
	</AppContext.Provider>
}
