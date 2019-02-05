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
			company: '',
			title: '',
			location: '',
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

		const expData = {
			company: this.state.company,
			title: this.state.title,
			location: this.state.location,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
		};

		this.props.addExperience(expData, this.props.history);
	}

	onChangeInput(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onCheckInput() {
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
				<h1 className="display-4 text-center">Add Experience</h1>
				<p className="lead text-center">
				Add any job or position that you have had in the past or current
				</p>
				<small className="d-block pb-3">* = required fields</small>
				<form onSubmit={this.onSubmit}>
				<TextFieldGroup
					inputPlaceholder="* Company"
					inputName="company"
					inputValue={this.state.company}
					onChangeInput={this.onChangeInput}
					error={errors.company}
				/>
				<TextFieldGroup
					inputPlaceholder="* Job Title"
					inputName="title"
					inputValue={this.state.title}
					onChangeInput={this.onChangeInput}
					error={errors.title}
				/>
				<TextFieldGroup
					inputPlaceholder="Location"
					inputName="location"
					inputValue={this.state.location}
					onChangeInput={this.onChangeInput}
					error={errors.location}
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
					inputPlaceholder="Job Description"
					inputName="description"
					inputValue={this.state.description}
					onChangeInput={this.onChangeInput}
					error={errors.description}
					info="Tell us about the the position"
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
	addExperience: (expData, history) => dispatch( actions.addExperience(expData, history) )
	
});

export default connect(mapStateToProps, mapDispatchToProps)(
	withRouter(AddExperience)
);