import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './autils/setAuthToken.js';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import * as actions from './state/actions/index';

import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import authReducer from './state/reducers/auth';
import errorsReducer from './state/reducers/errors';
import profileReducer from './state/reducers/profile';
import postReducer from './state/reducers/post';

const rootReducer = combineReducers({
	auth: authReducer,
	profile: profileReducer,
	errors: errorsReducer,
	post: postReducer
});



const configurateStore = (initialState = {}) => {
	const middleWares = [
		thunk
	]

	const enchansers = [
		applyMiddleware(...middleWares)
	]


	const store = createStore(
		rootReducer, 
		initialState, 
		compose(
			...enchansers,
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		)
	)
	
	return store
}

const store = configurateStore({});

if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);

	const jwtTokenDecoded = jwt_decode(localStorage.jwtToken);

	const currentTime = Date.now() / 1000;

	if (jwtTokenDecoded.exp < currentTime) {	
		store.dispatch( actions.clearCurrentProfile() );
		store.dispatch( actions.submitLogOut() );
	
	} else {
		store.dispatch( actions.submitLogInSuccess(jwtTokenDecoded) );

	}



} 

ReactDOM.render(
	<Provider store = {store}>
		<App />
	</Provider>

, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
