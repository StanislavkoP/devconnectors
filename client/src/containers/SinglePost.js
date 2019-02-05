import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as actions from '../state/actions/index';

import PostItem from '../components/postComponents/postItem';
import CommentForm from './CommentForm';
import CommentFeed from '../components/postComponents/commentFeed';
import Spinner from '../components/UI/Spinner/Spinner';


class Post extends Component {

	static propTypes = {
		getPost: PropTypes.func.isRequired,
		post: PropTypes.object.isRequired
	};

	componentDidMount() {
		this.props.getPost(this.props.match.params.id);
	}

	render() {
		const { post, loading } = this.props.post;
		let postContent;

		if (post === null || loading || Object.keys(post).length === 0) {
			postContent = <Spinner />;
		
		} else {
			postContent = (
				<div>
					<PostItem post={post} showActions={false} />
					<CommentForm postId={post._id} />
					<CommentFeed auth={this.props.auth} postId={post._id} comments={post.comments} />
				</div>
			);
	}

	return (
		<div className="post">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<Link to="/feed" className="btn btn-light mb-3">
							Back To Feed
						</Link>
						{postContent}
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
	getPost: (postId) => dispatch( actions.getPost(postId) ) 
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
