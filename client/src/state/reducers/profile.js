import * as actionTypes from '../actions/actionTypes';



const initialState = {
	profile: null,
	profiles: null,
	loading: true
}


const getCurrentProfileSuccess = (state, action) => {
	return {
		...state,
		profile: action.profile,
		loading: false,

	}
}

const getProfilesSuccess = (state, action) => {
	return {
		...state,
		profiles: action.profiles,
		loading: false,

	}
}

const getCurrentProfileNotFound = (state, action) => {
	return {
		...state,
		loading: false,
		profile: {}
	}
}

const clearCurrentProfile = (state, action) => {
	return {
		...state,
		profile: null
	}
}

const deleteProfileSuccess = (state, action) => {
	return {
		...state,
		profile: null
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_CURRENT_PROFILE_SUCCESS : return getCurrentProfileSuccess(state, action);
		case actionTypes.GET_CURRENT_PROFILE_NOT_FOUND : return getCurrentProfileNotFound(state, action);
		case actionTypes.GET_PROFILES_SUCCESS : return getProfilesSuccess(state, action);
		case actionTypes.CLEAR_CURRENT_PROFILE : return clearCurrentProfile(state, action);
		case actionTypes.DELETE_PROFILE_SUCCESS : return deleteProfileSuccess(state, action);
		default : return state
	}

};

export default reducer;