import axios from 'axios';
import * as actionTypes from './actionTypes';

const getCurrentProfileLoading = () => {
	return {
		type: actionTypes.GET_CURRENT_PROFILE_LOADING
	}
}

const getCurrentProfileSuccess = (dataProfile) => {
	return {
		type: actionTypes.GET_CURRENT_PROFILE_SUCCESS,
		profile: dataProfile
	}
}

const getCurrentProfileNotFound = () => {
	return {
		type: actionTypes.GET_CURRENT_PROFILE_NOT_FOUND
	}
}

export const clearCurrentProfile = () => {
	return {
		type: actionTypes.CLEAR_CURRENT_PROFILE
	}
}

export const getCurrentProfile = () => dispatch => {
	dispatch( getCurrentProfileLoading() )

	axios
		.get('/api/profile')
		.then(res => {
			dispatch( getCurrentProfileSuccess(res.data) )
		})
		.catch(err => {
			dispatch( getCurrentProfileNotFound(err.response.data) )
		})
};

const getProfilesSuccess = (dataProfiles) => {
	return {
		type: actionTypes.GET_PROFILES_SUCCESS,
		profiles: dataProfiles
	}
}

export const getProfiles = () => dispatch => {
	dispatch( getCurrentProfileLoading() )

	axios
		.get('/api/profile/all')
		.then(res => {
			dispatch( getProfilesSuccess(res.data) )
		})
		.catch(err => {
			dispatch( getProfilesSuccess(null) )
		})
};

export const getProfileByHandle = handle => dispatch => {
	dispatch( getCurrentProfileLoading() )

	axios
		.get(`/api/profile/handle/${handle}`)
		.then(res => {
			dispatch( getCurrentProfileSuccess(res.data) )
		})
		.catch(err => {
			dispatch( getCurrentProfileNotFound(err.response.data) )
		})
};

const createProfileSuccess = dataNewProfile => {
	return {
		type: actionTypes.CREATE_PROFILE_SUCCESS,
		profile: dataNewProfile
	}
}

const createProfileFailed = error => {
	return {
		type: actionTypes.GET_ERRORS,
		errors: error
	}
}

export const createProfile = (dataNewProfile, history) => dispatch => {

	axios
		.post('/api/profile', dataNewProfile)
		.then(res => {
			dispatch( createProfileSuccess(res.data) );
			history.push('/dashboard')
		})
		.catch(err => {
			dispatch( createProfileFailed(err.response.data))
		})
};

const deleteProfileSuccess = () => {
	return {
		type: actionTypes.SUBMIT_LOG_OUT
	}
};

const deleteProfileFailed = error => {
	return {
		type: actionTypes.GET_ERRORS,
		errors: error
	}
};
	
export const deleteProfile = () => dispatch => {
	
	if (window.confirm('Do you want to delete profile and account?')) {
		axios
			.delete('/api/profile')
			.then(res => {
				dispatch( deleteProfileSuccess() )
			})
			.catch(err => {
				dispatch( deleteProfileFailed(err.response.data) )
			})

	}
	
};


export const addExperience = (expData, history) => dispatch => {
	axios
		.post('/api/profile/experience', expData)
		.then(res => {
			dispatch( {type: actionTypes.ADD_EXPERIENCE_SUCCESS} );
			history.push('/');
		})
		.catch(err => 
			dispatch( 
				{
					type: actionTypes.GET_ERRORS, 
					errors: err.response.data
				}
			)
		)
};

export const addEducation = (educationData, history) => dispatch => {
	axios
		.post('/api/profile/education', educationData)
		.then(res => {
			dispatch( {type: actionTypes.ADD_EDUCATION_SUCCESS} );
			history.push('/');
		})
		.catch(err => 
			dispatch( 
				{
					type: actionTypes.GET_ERRORS, 
					errors: err.response.data
				}
			)
		)
};

export const deleteEducation = educationId => dispatch => {
	axios
		.delete(`/api/profile/education/${educationId}`)
		.then(res => {
			dispatch( {type: actionTypes.GET_CURRENT_PROFILE_SUCCESS, profile: res.data} );
		})
		.catch(err => 
			dispatch( 
				{
					type: actionTypes.GET_ERRORS, 
					errors: err.response.data
				}
			)
		)
};

export const deleteExperience = experienceId => dispatch => {
	axios
		.delete(`/api/profile/experience/${experienceId}`)
		.then(res => {
			dispatch( {type: actionTypes.GET_CURRENT_PROFILE_SUCCESS, profile: res.data} );
		})
		.catch(err => 
			dispatch( 
				{
					type: actionTypes.GET_ERRORS, 
					errors: err.response.data
				}
			)
		)
};

