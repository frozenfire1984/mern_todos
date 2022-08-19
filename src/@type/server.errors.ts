interface IServer_errors_details {
	value: string,
	msg: string,
	param: string,
	location: string
}

interface IServer_errors {
	errors: IServer_errors_details,
	msg: string,
	type: string
}

export {IServer_errors_details, IServer_errors}