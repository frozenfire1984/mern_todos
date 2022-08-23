/* eslint-disable */
import {createStore, combineReducers, applyMiddleware} from "redux";
import {counterReducer} from "./counter/counterReducer";
import {todosReducer} from "./todos/todosReducer";
import {composeWithDevTools} from "@redux-devtools/extension";
import {addTodosAction, removeTodoAction} from "./todos/todosActions"
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
	addTodosAction,
	removeTodoAction,
	incrCounterAction,
	decrCounterAction,
	resetCounterAction
}