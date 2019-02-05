import React from 'react';
import Moment from 'react-moment';

const experienceTable = props => {
	const experience = props.experience.map(exp => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			<td>{exp.title}</td>
			<td>
				<Moment format="YYYY/MM/DD">{exp.from}</Moment> -
				{exp.to === null ? (
					' Now'
				) : (
					<Moment format="YYYY/MM/DD">{exp.to}</Moment>
				)}
			</td>
			<td>
				<button
					onClick={() => props.clicked(exp._id)}
					className="btn btn-danger"
				>
					Delete
				</button>
			</td>
		</tr>
	));

	return (
		<div>
			<h4 className="mb-4">Experience Credentials</h4>
			<table className="table">
				<thead>
					<tr>
						<th>Company</th>
						<th>Title</th>
						<th>Years</th>
						<th />
					</tr>
					{experience}
				</thead>
			</table>
		</div>
	)
}

export default experienceTable;
