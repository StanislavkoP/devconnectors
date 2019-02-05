import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../state/actions/index';

import PostItem from '../components/postComponents/postItem'
import PostForm from './PostForm';
import Spinner from '../components/UI/Spinner/Spinner';


class Posts extends Component {

	onLikeClick(postId) {
		this.props.onLikePost(postId)
	}

	onUnlikeClick(postId) {
		this.props.onUnlikePost(postId)
	}

	onDeleteClick(postId) {
		this.props.onDeletePost(postId);
	}

	static propTypes = {
		getPostList: PropTypes.func.isRequired,
		post: PropTypes.object.isRequired
	};

	componentDidMount() {
		this.props.getPostList();
	}

	render() {
		const { posts, loading } = this.props.post;
		let postContent;

		if (posts === null || loading) {
			postContent = <Spinner />;
		} else {
			postContent = posts.map(post => 
					<PostItem
						onLikeClick={() => this.onLikeClick(post._id)}
						onUnlikeClick={() => this.onUnlikeClick(post._id)}
						onDeleteClick={() => this.onDeleteClick(post._id)}
						findUserLike={() => this.findUserLike()}
						auth={this.props.auth}
						key={post._id} 
						post={post} 
					/>
				);
		}

		return (
			<div className="feed">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<PostForm />
							{ postContent }
						</div>
					</div>
				</div>
			</div>
		);
	}
}



const mapStateToProps = state => ({
	post: state.post,
	auth: state.auth
});

const mapDispatchToProps = dispatch => ({
	getPostList: () => dispatch(actions.getPostList()),
	onLikePost: (postId) => dispatch( actions.onLikePost(postId) ),
	onUnlikePost: (postId) => dispatch( actions.onDeleteLikePost(postId) ),
	onDeletePost: (postId) => dispatch( actions.onDeletePost(postId) ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
