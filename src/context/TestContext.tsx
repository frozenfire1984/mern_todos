import React, {createContext, FC, ReactNode, useState} from 'react'

type Type_ComponentImportProps = {
	children: ReactNode
}

type Type_ProviderExportPropsStatus = boolean

export type Type_ProviderExportProps = {
	status: Type_ProviderExportPropsStatus;
	toggleStatus?: () => void
}

export const TestContext = createContext<Type_ProviderExportProps | null>(null)

const TestProvider: FC<Type_ComponentImportProps> = ({children}) => {
	const [status, setStatus] = useState<Type_ProviderExportPropsStatus>(false)
	const toggleStatus = () => {
		setStatus(!status)
	}
	
	return <TestContext.Provider value={{status, toggleStatus}}>
		{children}
	</TestContext.Provider>
}

export default TestProvider
