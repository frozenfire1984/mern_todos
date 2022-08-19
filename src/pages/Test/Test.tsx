import React, {useContext} from 'react'
import {TestContext, ITest} from '../../context/TestContext'

const Test = () => {
	const {status, toggleStatus} = useContext(TestContext) as ITest
	
	const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		return toggleStatus ? toggleStatus() : null
	}
	
	return (
		<div className="container">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, quaerat?
			<br/>
			{status.toString()}
			<button onClick={onClickHandler}>change status</button>
		</div>
	)
}

export default Test