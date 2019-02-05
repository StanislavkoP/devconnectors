import axios from 'axios';
import jwt_decode from 'jwt-decode';
import * as actionTypes from './actionTypes';
import setAuthToken from '../../autils/setAuthToken';

const registerSubmitSuccess = (userData) => {
	return {
		type: actionTypes.REGISTER_SUBMIT_SUCCESS,
		user: userData
	}
}

const registerSubmitFailed = (errors) => {
	return {
		type: actionTypes.GET_ERRORS,
		errors: errors
	}
}

export const registerSubmit = (userData, router) => dispatch => {

	axios
		.post('/api/users/register', userData)
		.then(res => {
			router.push('/login')
		})
		.catch(err => {
			dispatch ( registerSubmitFailed(err.response.data) );
			
		})
}

export const submitLogInSuccess = (userData) => {
	return {
		type: actionTypes.SUBMIT_LOGIN_SUCCESS,
		userData
	}
};

const submitLogInFailed = (errors) => {
	return {
		type: actionTypes.GET_ERRORS,
		errors
	}
}

export const submitLogIn = (userData) => dispatch => {
	axios
		.post('/api/users/login', userData)
		.then(res => {
			const { token } = res.data;
			const tokenDecoded = jwt_decode(token);

			localStorage.setItem('jwtToken', token);

			setAuthToken(token);

			dispatch( submitLogInSuccess(tokenDecoded) )
		})
		.catch(err => dispatch( submitLogInFailed(err.response.data) ))
}



export const submitLogOut = () => dispatch => {
	localStorage.removeItem('jwtToken');

	setAuthToken(false);

	dispatch( { type: actionTypes.SUBMIT_LOG_OUT } );

	dispatch({ type: actionTypes.CLEAR_CURRENT_PROFILE});
}
