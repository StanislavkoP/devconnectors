import React, { Component } from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { connect } from 'react-redux';
import * as actions from '../state/actions/index';
import {withRouter} from 'react-router-dom';


class Layout extends Component {

	submitLogOut = (e) => {
		e.preventDefault();
		this.props.submitLogOut();
	}

	render() {
		const { isAuth, user } = this.props.auth;

		return (
			<React.Fragment>
				<Header isAuth={isAuth} user={user} cliked={this.submitLogOut}/>
					{this.props.children}
				<Footer/>
			</React.Fragment>
		)
	}
};

const mapStateToProps = state => {
	return {
		auth: state.auth
	}
};

const mapDispatchToProps = dispatch => {
	return {
		submitLogOut: () => dispatch( actions.submitLogOut() )
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
