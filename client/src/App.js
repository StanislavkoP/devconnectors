import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import PrivetRoute from './hoc/PrivetRouter';
import './App.css';

import Layout from './hoc/Layout';
import Landing from './containers/Landing';
import Registration from './containers/Registration';
import LogIn from './containers/Login';
import Dashboard from './containers/Dashboard';
import CreateProfile from './containers/CreateProfile';
import EditProfile from './containers/EditProfile';
import AddExperience from './containers/AddExperience';
import AddEducation from './containers/AddEducation';
import Profiles from './containers/Profiles';
import Profile from './containers/Profile';
import PostFeed from './containers/PostFeed';
import SinglePost from './containers/SinglePost';




class App extends Component {
	render() {
		return (
			<Router>
				<Layout>
					<Switch>
						<Route exact path="/" component={Landing}/>
						<Route path="/register"  component={Registration}/>
						<Route path="/login" component={LogIn}/>
						<Route path="/profiles" component={Profiles}/>
						<Route exact path="/profile/:handle" component={Profile}/>
						<Route exact path="/feed" component={PostFeed}/>
						<PrivetRoute exact path="/dashboard" component={Dashboard}/>
						<PrivetRoute exact path="/create-profile" component={CreateProfile}/>
						<PrivetRoute exact path="/edit-profile" component={EditProfile}/>
						<PrivetRoute exact path="/add-experience" component={AddExperience}/>
						<PrivetRoute exact path="/add-education" component={AddEducation}/>
						<PrivetRoute exact path="/post/:id" component={SinglePost}/>
						<Redirect to="/"/>
					</Switch>
				</Layout>
			</Router>
			
		)
	}
}

export default App;
