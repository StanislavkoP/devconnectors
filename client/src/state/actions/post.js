import axios from 'axios';
import * as actionTypes from './actionTypes';


const getPostSuccess = post => {
	console.log(post);
	return {
		type: actionTypes.GET_POST_SUCCESS,
		post
	}
}

export const getPost = postId => dispatch => {
	axios
		.get(`/api/posts/post/${postId}`)
		.then(res => dispatch( getPostSuccess(res.data) ))
		.catch(err => console.log(err))
}

const getPostListLoading = () => {
	return {
		type: actionTypes.GET_POST_LIST_LOADING,
	}
}

const getPostListSuccess = posts => {
	return {
		type: actionTypes.GET_POST_LIST_SUCCESS,
		posts
	}
}

export const getPostList = () => dispatch => {
	dispatch( getPostListLoading() );

	axios
		.get('/api/posts')
		.then(res => dispatch( getPostListSuccess(res.data) ))
		.catch(err => console.log(err))
}


const addPostSuccess = newPost => {
	return {
		type: actionTypes.ADD_POST_SUCCESS,
		newPost
	}
}

export const addPost = (newPost) => dispatch => {
	console.log(newPost)
	axios
		.post('/api/post', newPost)
		.then(res => dispatch( addPostSuccess(res.data) ))
		.catch(err => dispatch({type: actionTypes.GET_ERRORS, errors: err.response.data}))
}





export const onLikePost = (postId) => dispatch => {
	
	axios
		.post(`/api/post/like/${postId}`)
		.then( () => dispatch( getPostList() ))
		.catch(err => dispatch({type: actionTypes.GET_ERRORS, errors: err.response.data}))
} 


const onDeletePostSuccess = postId => {
	return {
		type: actionTypes.DELETE_POST_SUCCESS,
		postId
	}
}

export const onDeletePost = postId => dispatch => {

	axios
		.delete(`/api/posts/post/${postId}`)
		.then( () => dispatch( onDeletePostSuccess(postId) ))
		.catch(err => dispatch({type: actionTypes.GET_ERRORS, errors: err.response.data}))
} 

export const onDeleteLikePost = postId => dispatch => {

	axios
		.delete(`/api/post/unlike/${postId}`)
		.then( () => dispatch( getPostList() ))
		.catch(err => dispatch({type: actionTypes.GET_ERRORS, errors: err.response.data}))
}

const addCommentSuccess = newPost => {
	return {
		type: actionTypes.ADD_COMMENT_SUCCESS,
		newPost
	}
}

export const addComment = (commentData, postId) => dispatch => {
	console.log(commentData)
	axios
		.post(`/api/post/comment/${postId}`, commentData)
		.then(res => dispatch( addCommentSuccess(res.data) ))
}