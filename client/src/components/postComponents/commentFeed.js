import React from 'react';
import CommentItem from './commentItem';

function commentFeed(props) {

	return props.comments.map(comment => (
		<CommentItem key={comment._id} auth={props.auth} comment={comment} postId={props.postId} />
	));
}

export default commentFeed
