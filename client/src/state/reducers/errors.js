import * as actionTypes from '../actions/actionTypes';


const initialState = {
	errors: {}
}

const getErrors = (state, action) => {
	return {
		errors: action.errors
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_ERRORS : return getErrors(state, action);
		default : return state
	}

};

export default reducer;