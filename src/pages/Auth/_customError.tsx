import {IServer_errors} from '../../@type/server.errors'

export default class CustomError extends Error {
	constructor(message: string) {
		super(message)
		//Object.setPrototypeOf(this, CustomError.prototype)
	}
	error_msg: IServer_errors | null = null
	response?: object
}
