/* eslint-disable */
//import {createStore, combineReducers, applyMiddleware} from "redux";
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {counterReducerRTK} from "./counter/counterReducerRTK";
import {todosReducerRTK} from "./todos/todosReducerRTK";
//import {composeWithDevTools} from "@redux-devtools/extension";

import thunk from "redux-thunk"

const rootReducer = combineReducers({
	counter_rtk: counterReducerRTK,
	todos_rtk: todosReducerRTK
})

//const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
const store = configureStore({
		reducer: rootReducer,

})


export {store}