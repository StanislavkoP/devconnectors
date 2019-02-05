import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaGroup from '../components/UI/TextAreaGroup/TextAreaGroup';
import * as actions from '../state/actions/index';

class PostForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	static propTypes = {
		addPost: PropTypes.func.isRequired,
		auth: PropTypes.object.isRequired,
		errors: PropTypes.object.isRequired
	};

	componentWillReceiveProps(newProps) {
		if (newProps.errors) {
			this.setState({ errors: newProps.errors });
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const { user } = this.props.auth;

		const newPost = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar
		};

		this.props.addPost(newPost);
		this.setState({ text: '' });
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors } = this.state;
		
		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">
						Say Something...
					</div>
					<div className="card-body">
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<TextAreaGroup
									inputPlaceholder="Create a post"
									inputName="text"
									inputValue={this.state.text}
									onChangeInput={this.onChange}
									error={errors.text}
								/>
								
							</div>
							<button type="submit" className="btn btn-dark">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}



const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

const mapDispatchToProps = dispatch => ({
	addPost: (newPost) => dispatch( actions.addPost(newPost) )
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
