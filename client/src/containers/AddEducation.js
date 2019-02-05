import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../state/actions/index';

import TextFieldGroup from '../components/UI/textGropField/textGroupField';
import TextAreaGroup from '../components/UI/TextAreaGroup/TextAreaGroup';


class AddExperience extends Component {
	constructor(props) {
		super(props);
		this.state = {
			school: '',
			degree: '',
			fieldofstudy: '',
			from: '',
			to: '',
			current: false,
			description: '',
			errors: {},
			disabled: false
		};

		this.onChangeInput = this.onChangeInput.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCheckInput = this.onCheckInput.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors.errors });
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const educationData = {
			school: this.state.school,
			degree: this.state.degree,
			fieldofstudy: this.state.fieldofstudy,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
		};

		this.props.addEducation(educationData, this.props.history);
	}

	onChangeInput(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onCheckInput(e) {
		this.setState({
			disabled: !this.state.disabled,
			current: !this.state.current
		});
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="add-experience">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
							Go Back
							</Link>
							<h1 className="display-4 text-center">Add Education</h1>
							<p className="lead text-center">
							Add any school, bootcamp, etc that you have attended
							</p>
							<small className="d-block pb-3">* = required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									inputPlaceholder="* School"
									inputName="school"
									inputValue={this.state.school}
									onChangeInput={this.onChangeInput}
									error={errors.school}
								/>
								<TextFieldGroup
									inputPlaceholder="* Degree or Certification"
									inputName="degree"
									inputValue={this.state.degree}
									onChangeInput={this.onChangeInput}
									error={errors.degree}
								/>
								<TextFieldGroup
									inputPlaceholder="* Field of Study"
									inputName="fieldofstudy"
									inputValue={this.state.fieldofstudy}
									onChangeInput={this.onChangeInput}
									error={errors.fieldofstudy}
								/>
								<h6>From Date</h6>
								<TextFieldGroup
									inputName="from"
									inputType="date"
									inputValue={this.state.from}
									onChangeInput={this.onChangeInput}
									error={errors.from}
								/>
								<h6>To Date</h6>
								<TextFieldGroup
									inputName="to"
									inputType="date"
									inputValue={this.state.to}
									onChangeInput={this.onChangeInput}
									error={errors.to}
									disabled={this.state.disabled ? 'disabled' : ''}
								/>
								<div className="form-check mb-4">
								<input
									type="checkbox"
									className="form-check-input"
									name="current"
									value={this.state.current}
									checked={this.state.current}
									onChange={this.onCheckInput}
									id="current"
								/>
								<label htmlFor="current" className="form-check-label">
									Current Job
								</label>
								</div>
								<TextAreaGroup
									inputPlaceholder="Program Description"
									inputName="description"
									inputValue={this.state.description}
									onChangeInput={this.onChangeInput}
									error={errors.description}
									info="Tell us about the program that you were in"
								/>
								<input
									type="submit"
									value="Submit"
									className="btn btn-info btn-block mt-4"
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
	addEducation: (educationData, history) => dispatch( actions.addEducation(educationData, history) )
	
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(AddExperience)
);