import React, {createContext, FC, ReactNode} from 'react'

type Type_ComponentImportProps = {
	children: ReactNode
}

type Type_ProviderExportPropVars = {
	url: string,
	test_value?: string
}

export type Type_ProviderExportProps = {
	vars: Type_ProviderExportPropVars
}

export const AppContext = createContext<Type_ProviderExportProps | null>(null)

export const AppProvider: FC<Type_ComponentImportProps> = ({children}) => {
	
	/*const [vars, setVars] = useState<Type_ProviderExportPropVars>({
		url: 'http://localhost:5001',
		test_value: 'foo bar',
	})*/
	
	const vars: Type_ProviderExportPropVars = {
		url: 'http://localhost:5001',
		test_value: 'foo bar',
	}
	
	return <AppContext.Provider value={{vars}}>
		{children}
	</AppContext.Provider>
}
