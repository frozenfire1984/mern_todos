import React from 'react'

interface IProps {
	param: string
}

const Info = ({param}: IProps) => {
	return (
		<div className="container">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, quaerat?
			<br/>
			{param}
		</div>
	)
}

export default Info