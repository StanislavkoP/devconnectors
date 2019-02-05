import * as actionTypes from '../actions/actionTypes';
import isEmpty from '../../validation/isEmpty';


const initialState = {
	isAuth: false,
	user: {}
}

const registerSubmitSuccess = (state, action) => {
	return {
		...state,
		user: action.user
	}
}

const submitLogInSuccess = (state, action) => {
	return {
		...state,
		isAuth: !isEmpty(action.userData),
		user: action.userData
	}
}

const submitLogOut = (state, action) => {
	return {
		...state,
		isAuth: false,
		user: {}
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.REGISTER_SUBMIT_SUCCESS : return registerSubmitSuccess(state, action);
		case actionTypes.SUBMIT_LOGIN_SUCCESS : return submitLogInSuccess(state, action);
		case actionTypes.SUBMIT_LOG_OUT : return submitLogOut(state, action);
		default : return state
	}

};

export default reducer;