import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../state/actions/index';

import Spinner from '../components/UI/Spinner/Spinner';
import ProfileActions from '../components/UI/ProfileActions/ProfileActions';
import EducationTable from '../components/educationTable/educationTable';
import ExperienceTable from '../components/experienceTable/experienceTable';

export class Dashboard extends Component {

	componentDidMount() {
		this.props.getCurrentProfile()
	}

	onDeleteProfile = () => {
		this.props.deleteProfile()
	}

	onDeleteEducation = eduId => {
		this.props.deleteEducation(eduId);
	}

	onDeleteExperience = expId => {
		this.props.deleteExperience(expId);
	}

	render() {
		const { user } = this.props.auth
		const {loading, profile} = this.props.profile;

		let dashBoardContent;
		
		if ( profile === null || loading) {
			dashBoardContent = ( <Spinner /> )
		
		} else {
			if (Object.keys(profile).length > 0) {
				dashBoardContent = (
					<div>
						<p className="lead text-muted">
							Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
						</p>
						<ProfileActions />
						<ExperienceTable clicked={this.onDeleteExperience} experience={profile.experience}/>
						<EducationTable clicked={this.onDeleteEducation} education={profile.education}/>
						<div style={{ marginBottom: '60px' }} />
						<button
							onClick={this.onDeleteProfile}
							className="btn btn-danger"
						>
							Delete My Account
						</button>
					</div>
					
						
				)
			} else {
				dashBoardContent = (
					<div>
						<p className="lead text-muted">Welcom {user.name}</p>
						<p>You haven`t profile</p>
						<Link to="/create-profile" className="btn btn-lg btn-info">Create profile</Link>
					</div>
				)
			}
		}
		
		


		


		return (
			<React.Fragment>
				<h1>Dashboard</h1>
				{ dashBoardContent }
			</React.Fragment>
		)
	}
};

const mapStateToProps = state => {
	return {
		auth: state.auth,
		profile: state.profile,
	}
};

const mapDispatchToprops = dispatch => {
	return {
		getCurrentProfile: () => dispatch( actions.getCurrentProfile() ),
		deleteProfile: () => dispatch( actions.deleteProfile() ),
		deleteEducation: (eduId) => dispatch( actions.deleteEducation(eduId) ),
		deleteExperience: (expId) => dispatch( actions.deleteExperience(expId) )
	}
}

export default connect(mapStateToProps, mapDispatchToprops)(Dashboard)
