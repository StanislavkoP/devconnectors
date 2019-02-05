import * as actionTypes from '../actions/actionTypes';

const initialState = {
	posts: [],
	post: {},
	loading: true
}

const getPostListSuccess = (state, action) => {
	return {
		...state,
		posts: action.posts,
		loading: false
	}
}

const addPostSuccess = (state, action) => {
	return {
		...state,
		posts: [action.newPost, ...state.posts]
	}
}

const addCommentSuccess = (state, action) => {
	return {
		...state,
		post: action.newPost
	}
}

const getPostSuccess = (state, action) => {
	return {
		...state,
		post: action.post,
		loading: false
	}
}

const deletePostSuccess = (state, action) => {
	return {
		...state,
		posts: state.posts.filter( post => post._id !== action.postId)
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_POST_LIST_SUCCESS : return getPostListSuccess(state, action);
		case actionTypes.GET_POST_SUCCESS : return getPostSuccess(state, action);
		case actionTypes.ADD_POST_SUCCESS : return addPostSuccess(state, action);
		case actionTypes.ADD_COMMENT_SUCCESS : return addCommentSuccess(state, action);
		case actionTypes.DELETE_POST_SUCCESS : return deletePostSuccess(state, action);
		default : return state
	}

};

export default reducer;