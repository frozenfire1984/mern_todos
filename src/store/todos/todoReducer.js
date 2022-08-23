/*const initialStore = {
	_id: new Date().getTime(),
	text: 'foo bar',
	owner: '',
	completed: false,
	important: false
}*/

const initialStore = {
	test: 100
}


//const action = {type: '', payload: ''}

const todoReducer = (store = initialStore, action) => {
	switch (action.type) {
		case 'ADD-TODO':
			return {...store, test: store.test + action.payload}
		case 'REMOVE-TODO':
			return {...store, test: store.test - action.payload}
		default: {
			return store
		}
	}
	
}

export {todoReducer}