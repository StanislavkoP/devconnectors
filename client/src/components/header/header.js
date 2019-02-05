import React from 'react';
import {Link} from 'react-router-dom';

const header = props => {
	const {isAuth, user} = props;
	
	const authLinks = (
		<ul className="navbar-nav ml-auto">
			<li className="nav-item">
				<Link className="nav-link" to="/feed">
					Post Feed
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/dashboard">
					Dashboard
				</Link>
			</li>
			<li className="nav-item">
				<a
					href=""
					onClick={props.cliked}
					className="nav-link"
				>
					<img
						className="rounded-circle"
						src={user.avatar}
						alt={user.name}
						style={{ width: '25px', marginRight: '5px' }}
						title="You must have a Gravatar connected to your email to display an image"
					/>
					Logout
				</a>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul className="navbar-nav ml-auto">
			<li className="nav-item">
				<Link className="nav-link" to="/register">
					Sign Up
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/login">
					Login
				</Link>
			</li>
		</ul>
	)

	return (
		<header>
			<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
				<div className="container">
					<Link className="navbar-brand" to="/dashboard">DevConnector</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="mobile-nav">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item">
								<Link className="nav-link" to="/profiles"> Developers
								</Link>
							</li>
						</ul>

						{isAuth ? authLinks : guestLinks }

					</div>
				</div>
			</nav>
		</header>
	)
};

export default header;
