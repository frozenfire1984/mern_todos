import {useState} from 'react'

interface IHook {
	test: boolean,
	setHandler: () => void
}

const useTest = (initialValue: boolean): IHook => {
	const [test, setTest] = useState(initialValue)
	
	const setHandler = () => {
		setTest(!test)
	}
	
	return {test, setHandler} as const
}

export {useTest}