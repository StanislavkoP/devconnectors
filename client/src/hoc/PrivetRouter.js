import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

const PrivetRoute = ({component: Component, auth, ...rest}) =>(
	<Route 
		{...rest}
		render = { props =>
			auth.isAuth === true
			?
				( <Component {...props}/> )
			:
				( <Redirect to="login"/> )
		}
/>
)
const mapStateToProps = state => {
	return {
		auth: state.auth
	}
};


export default connect(mapStateToProps)(PrivetRoute)