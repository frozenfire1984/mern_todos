/* eslint-disable */
import {createStore, combineReducers, applyMiddleware} from "redux";
import {counterReducer} from "./counter/counterReducer";
import {todosReducer} from "./todos/todosReducer";
import {composeWithDevTools} from "@redux-devtools/extension";
import {
	addTodoAction,
	getTodosAction,
	setLoaderTodosAction,
	setLoaderAddingTodosAction,
	setErrorTodosAction,
	removeTodoAction} from "./todos/todosActions"
import {incrCounterAction, decrCounterAction, resetCounterAction} from "./counter/counterActions"
import thunk from "redux-thunk"

const rootReducer = combineReducers({
	counter: counterReducer,
	todos: todosReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

console.log(store.getState())

export {
	store,
	addTodoAction,
	getTodosAction,
	setLoaderTodosAction,
	setLoaderAddingTodosAction,
	setErrorTodosAction,
	removeTodoAction,
	
	
	incrCounterAction,
	decrCounterAction,
	resetCounterAction
}