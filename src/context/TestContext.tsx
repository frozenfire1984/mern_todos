import React, {createContext, FC, ReactNode, useState} from 'react'

type TProps = {
	children: ReactNode
}

type TStatus = boolean

export interface ITest {
	status: TStatus;
	toggleStatus?: () => void
}

export const TestContext = createContext<ITest | null>(null)

const TestProvider: FC<TProps> = ({children}) => {
	const [status, setStatus] = useState<TStatus>(false)
	const toggleStatus = () => {
		setStatus(!status)
	}
	
	return <TestContext.Provider value={{status, toggleStatus}}>
		{children}
	</TestContext.Provider>
}

export default TestProvider
