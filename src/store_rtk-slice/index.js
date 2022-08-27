/* eslint-disable */
//import {createStore, combineReducers, applyMiddleware} from "redux";
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import counterSlice from "./counter/counterReducerRTK";
import todosSlice from "./todos/todosReducerRTK";
//import {composeWithDevTools} from "@redux-devtools/extension";

import thunk from "redux-thunk"

const rootReducer = combineReducers({
	counter_rtk: counterSlice,
	todos_rtk: todosSlice
})

//const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
const store = configureStore({
		reducer: rootReducer,

})


export {store}