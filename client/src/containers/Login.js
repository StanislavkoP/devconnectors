import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../state/actions/index';
import TextGroupField from '../components/UI/textGropField/textGroupField';

class LogIn extends Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: '',
			errors: {}
		}

		this.onChangeInput = this.onChangeInput.bind(this);
		this.onSubmitForm = this.onSubmitForm.bind(this);
	}

	componentDidMount () {
		if (this.props.auth.isAuth) {
			this.props.history.push('/dashboard')
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({errors: nextProps.errors.errors})
		
		}

		if (nextProps.auth.isAuth) {
			this.props.history.push('/dashboard');
		}
	}

	onChangeInput (e) {
		this.setState({[e.target.name] : e.target.value})
	}

	onSubmitForm (e) {
		e.preventDefault();

		const {
			email,
			password,
		} = this.state

		const userData = {
			email,
			password,
		}

		this.props.submitLogIn(userData);
		
	}


	render() {
		const { errors } = this.state;

		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<p className="lead text-center">Sign in to your DevConnector account</p>
							<form onSubmit={this.onSubmitForm}>
								
								<TextGroupField 
									inputType = "text"
									inputPlaceholder = "Email Adress"
									inputName = "email"
									inputValue = {this.state.email}
									info = "This site uses Gravatar so if you want a profile image, use a Gravatar email"
									onChangeInput = {this.onChangeInput}
									errors = {errors}
								/>

								<TextGroupField 
									inputType = "password"
									inputPlaceholder = "Password"
									inputName = "password"
									inputValue = {this.state.password}
									onChangeInput = {this.onChangeInput}
									errors = {errors}
								/>
								
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
};

const mapStateToProps = state => {
	return {
		auth: state.auth,
		errors: state.errors,
	}
};

const mapDispatchToProps = dispatch => {
	return {
		submitLogIn : (userData) => dispatch( actions.submitLogIn(userData) )
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)
