/* eslint-disable */
import {createStore, combineReducers} from "redux";
import {counterReducer} from "./counter/counterReducer";
import {todosReducer} from "./todos/todosReducer";
import {composeWithDevTools} from "@redux-devtools/extension";
import {addTodosAction, removeTodoAction} from "./todos/todosActions"
import {incrCounterAction, decrCounterAction, resetCounterAction} from "./counter/counterActions"

const rootReducer = combineReducers({
	counter: counterReducer,
	todos: todosReducer
})

const store = createStore(rootReducer)

console.log(store.getState())

export {
	store,
	addTodosAction,
	removeTodoAction,
	incrCounterAction,
	decrCounterAction,
	resetCounterAction
}