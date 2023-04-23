import React from "react";
import  ReactDOM  from "react-dom";
import { applyMiddleware, createStore } from 'redux'
import { Provider } from "react-redux";

import reducers from "./main/reducers";
import App from "./main/app";

import promise from "redux-promise";
import multi from 'redux-multi'
import thunk from 'redux-thunk'


const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__() 
const store = applyMiddleware(promise, multi, thunk)(createStore)(reducers, devTools)
const el = document.querySelector('#root')
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, el
)
