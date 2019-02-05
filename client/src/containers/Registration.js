import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../state/actions/index';
import {withRouter} from 'react-router-dom';

import TextGroupField from '../components/UI/textGropField/textGroupField';

class Registration extends Component {
	constructor() {
		super();

		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
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
	}

	onChangeInput (e) {
		this.setState({[e.target.name] : e.target.value})
	}

	onSubmitForm (e) {
		e.preventDefault();

		const {
			name,
			email,
			password,
			password2

		} = this.state

		const newUser = {
			name,
			email,
			password,
			password2
		}

		this.props.registerSubmit(newUser, this.props.history)


	}


	render() {
		const { errors } = this.state;

		return (
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">Create your DevConnector account</p>
							<form noValidate onSubmit={this.onSubmitForm}>
								
								<TextGroupField 
									inputType = "text"
									inputPlaceholder = "Name"
									inputName = "name"
									inputValue = {this.state.name}
									onChangeInput = {this.onChangeInput}
									errors = {errors}
								/>

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

								<TextGroupField 
									inputType = "password"
									inputPlaceholder = "Confirm Password"
									inputName = "password2"
									inputValue = {this.state.password2}
									onChangeInput = {this.onChangeInput}
									errors = {errors}
								/>

								<input type="submit" className="btn btn-info btn-block mt-4" value="Submit"/>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		errors: state.errors
	}
	
}

const mapDispatchToProps = (dispatch) => {
	return {
		registerSubmit: (userData, withRouter) => dispatch( actions.registerSubmit(userData, withRouter) )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)( withRouter(Registration) )
