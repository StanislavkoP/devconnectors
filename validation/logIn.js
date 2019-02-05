const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validationLogInInput(data) {
	let errors = {};

	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';


	if (validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	}

	if (!validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	if (validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	  }
	
	if (!validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}


	return {
		errors,
		isValid: isEmpty(errors)
	}
}
