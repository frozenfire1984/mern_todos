export default interface IAuth {
	login: (jwtToken: string, id: string) => void,
	logout: () => void,
	token: string,
	userId: string,
	isReady: boolean,
	isLogin: boolean
}


