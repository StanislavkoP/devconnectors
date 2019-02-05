import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as actions from '../state/actions/index';

import ProfileHeader from '../components/profileComponents/Header';
import ProfileAbout from '../components/profileComponents/profileAbout';
import ProfileCreds from '../components/profileComponents/profileCreds';
import GitHubProfile from './GitHubProfile';
import Spinner from '../components/UI/Spinner/Spinner';

class Profile extends Component {
	componentDidMount() {
		if (this.props.match.params.handle) {
			this.props.getProfileByHandle(this.props.match.params.handle);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.profile.profile === null && this.props.profile.loading) {
			this.props.history.push('/not-found');
		}
	}

	render() {
		const { profile, loading } = this.props.profile;
		let profileContent;

		if (profile === null || loading) {
			profileContent = <Spinner />;
		} else {
			profileContent = (
				<div>
					<div className="row">
						<div className="col-md-6">
							<Link to="/profiles" className="btn btn-light mb-3 float-left">
							Back To Profiles
							</Link>
						</div>
						<div className="col-md-6" />
					</div>
					<ProfileHeader profile={profile} />
					<ProfileAbout profile={profile} />
					<ProfileCreds
						education={profile.education}
						experience={profile.experience}
					/>
					{
						profile.githubusername 
						? ( <GitHubProfile username={profile.githubusername} /> ) 
						: null
					}
				</div>
			);
		}

		return (
			<div className="profile">
				<div className="container">
					<div className="row">
						<div className="col-md-12">{profileContent}</div>
					</div>
				</div>
			</div>
		);
	}
}

Profile.propTypes = {
	getProfileByHandle: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

const mapDispatchToProps = dispatch => ({
	getProfileByHandle: (handle) => dispatch( actions.getProfileByHandle(handle) )
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
