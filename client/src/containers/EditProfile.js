import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../state/actions/index';
import isEmpty from '../validation/isEmpty';
import TextAreaGroup from '../components/UI/TextAreaGroup/TextAreaGroup';
import InputIconGroup from '../components/UI/InputIconGroup/InputIconGroup';
import SelectListGroup from '../components/UI/SelectListGroup/SelectListGroup';
import TextGroupField from '../components/UI/textGropField/textGroupField';


class CreateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			handle: '',
			company: '',
			website: '',
			location: '',
			status: '',
			skills: '',
			githubusername: '',
			bio: '',
			twitter: '',
			facebook: '',
			linkedin: '',
			youtube: '',
			instagram: '',
			errors: {}
		};

		this.onChangeInput = this.onChangeInput.bind(this);
		this.onSubmitForm = this.onSubmitForm.bind(this);

	}

	componentDidMount() {
		this.props.getCurrentProfile();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({errors: nextProps.errors.errors})
		}

		if (nextProps.profile.profile) {
			const profile = nextProps.profile.profile;
			
			const skillsCSV = !isEmpty(profile.handle) ? profile.skills.join(',') : '';

			profile.handle = !isEmpty(profile.handle) ? profile.handle : '';
			profile.company = !isEmpty(profile.company) ? profile.company : '';
			profile.website = !isEmpty(profile.website) ? profile.website : '';
			profile.location = !isEmpty(profile.location) ? profile.location : '';
			profile.status = !isEmpty(profile.status) ? profile.status : '';
			profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
			profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
			profile.socical = !isEmpty(profile.socical) ? profile.socical : {};
			profile.twitter = !isEmpty(profile.twitter) ? profile.twitter : '';
			profile.linkedin = !isEmpty(profile.linkedin) ? profile.linkedin : '';
			profile.facebook = !isEmpty(profile.facebook) ? profile.facebook : '';
			profile.instagram = !isEmpty(profile.instagram) ? profile.instagram : '';
			profile.youtube = !isEmpty(profile.youtube) ? profile.youtube : '';

			this.setState({
				handle: profile.handle,
				company: profile.company,
				website: profile.website,
				location: profile.location,
				status: profile.status,
				skills: skillsCSV,
				githubusername: profile.githubusername,
				bio: profile.bio,
				twitter: profile.twitter,
				facebook: profile.facebook,
				linkedin: profile.linkedin,
				youtube: profile.youtube
			})
		}
	}

	onChangeInput (e) {
		this.setState({[e.target.name] : e.target.value})
	}

	onSubmitForm (e) {
		e.preventDefault();
	
		const profileData = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			status: this.state.status,
			skills: this.state.skills,
			githubusername: this.state.githubusername,
			bio: this.state.bio,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			youtube: this.state.youtube,
			instagram: this.state.instagram
		  };
	  
		this.props.createProfile(profileData, this.props.history);
		
	}

	render() {
		const { errors, displaySocialInputs } = this.state;

		const options = [
			{ label: '* Select Professional Status', value: 0 },
			{ label: 'Developer', value: 'Developer' },
			{ label: 'Junior Developer', value: 'Junior Developer' },
			{ label: 'Senior Developer', value: 'Senior Developer' },
			{ label: 'Manager', value: 'Manager' },
			{ label: 'Student or Learning', value: 'Student or Learning' },
			{ label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
			{ label: 'Intern', value: 'Intern' },
			{ label: 'Other', value: 'Other' }
		];

		let socialInputs = null;
		if (displaySocialInputs) {
			socialInputs = (
				<div>
					<InputIconGroup
						inputPlaceHolder="Twitter Profile URL"
						name="twitter"
						icon="fab fa-twitter"
						value={this.state.twitter}
						onChange={this.onChange}
						error={errors.twitter}
					/>
			
					<InputIconGroup
						inputPlaceHolder="Facebook Page URL"
						name="facebook"
						icon="fab fa-facebook"
						value={this.state.facebook}
						onChange={this.onChange}
						error={errors.facebook}
					/>
			
					<InputIconGroup
						inputPlaceHolder="Linkedin Profile URL"
						inputName="linkedin"
						icon="fab fa-linkedin"
						inputValue={this.state.linkedin}
						onChangeInput={this.onChangeInput}
						error={errors.linkedin}
					/>
			
					<InputIconGroup
						inputPlaceHolder="YouTube Channel URL"
						inputName="youtube"
						icon="fab fa-youtube"
						inputValue={this.state.youtube}
						onChangeInput={this.onChangeInput}
						error={errors.youtube}
					/>
			
					<InputIconGroup
						inputPlaceHolder="Instagram Page URL"
						inputName="instagram"
						icon="fab fa-instagram"
						inputValue={this.state.instagram}
						onChangeInput={this.onChangeInput}
						error={errors.instagram}
					/>
				</div>
			);
			}
	  

		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
						<Link to="/dashboard" className="btn btn-light">
							Go Back
						</Link>
						<h1 className="display-4 text-center">Create Your Profile</h1>
						<p className="lead text-center">
							Let's get some information to make your profile stand out
						</p>
						<small className="d-block pb-3">* = required fields</small>
						<form onSubmit={this.onSubmitForm}>
							<TextGroupField 
								inputType = "text"
								inputPlaceholder = "* Profile Handle"
								inputName = "handle"
								inputValue = {this.state.handle}
								info = "A unique handle for your profile URL. Your full name, company name, nickname"
								onChangeInput = {this.onChangeInput}
								error = {errors.handle}
							/>

							<SelectListGroup
								inputPlaceHolder="Status"
								inputName="status"
								inputValue={this.state.status}
								onChangeInput={this.onChangeInput}
								error={errors.status}
								options={options}
								info="Give us an idea of where you are at in your career"
							/>

							<TextGroupField 
								inputType = "text"
								inputPlaceholder = "Company"
								inputName = "company"
								inputValue = {this.state.company}
								info = "Could be your own company or one you work for"
								onChangeInput = {this.onChangeInput}
								error = {errors.company}
							/>

							<TextGroupField 
								inputType = "text"
								inputPlaceholder = "Website"
								inputName = "website"
								inputValue = {this.state.website}
								info = "Could be your own website or a company one"
								onChangeInput = {this.onChangeInput}
								error = {errors.website}
							/>

							<TextGroupField 
								inputType = "text"
								inputPlaceholder = "Location"
								inputName = "location"
								inputValue = {this.state.location}
								info = "City or city & state suggested (eg. Boston, MA)"
								onChangeInput = {this.onChangeInput}
								error = {errors.location}
							/>

							<TextGroupField 
								inputType = "text"
								inputPlaceholder = "* Skills"
								inputName = "skills"
								inputValue = {this.state.skills}
								info = "Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
								onChangeInput = {this.onChangeInput}
								error = {errors.skills}
							/>

							<TextGroupField 
								inputType = "text"
								inputPlaceholder = "Github Username"
								inputName = "githubusername"
								inputValue = {this.state.githubusername}
								info = "If you want your latest repos and a Github link, include your username"
								onChangeInput = {this.onChangeInput}
								error = {errors.githubusername}
							/>

							<TextAreaGroup 
								inputPlaceholder = "Short Bio"
								inputName = "bio"
								inputValue = {this.state.bio}
								info = "Tell us a little about yourself"
								onChangeInput = {this.onChangeInput}
								error = {errors.bio}
							/>
							<div className="mb-3">
								<button
									type="button"
									onClick={() => {
									this.setState(prevState => ({
										displaySocialInputs: !prevState.displaySocialInputs
									}));
									}}
									className="btn btn-light"
								>
									Add Social Network Links
								</button>
								<span className="text-muted">Optional</span>
							</div>
							{socialInputs}
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
		)
	}
};

const mapStateToProps = state => {
	return {
		profile: state.profile,
		errors: state.errors
	}
};

const mapDispatchToprops = dispatch => {
	return {
		createProfile: (profileData, history) => dispatch( actions.createProfile(profileData, history) ),
		getCurrentProfile: () => dispatch( actions.getCurrentProfile() )
	}
};

export default connect(mapStateToProps, mapDispatchToprops)(withRouter(CreateProfile));