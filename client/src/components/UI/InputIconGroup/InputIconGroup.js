import React from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';

const InputIconGroup = props => {
	const { 
		inputType,
		inputPlaceholder, 
		inputName, 
		inputValue, 
		icon, 
		onChangeInput,  
		error
	
	} = props

	return (
		<div className="input-group mb-3">
			<div className="input-group-prepend">
				<span className="input-group-text">
					<i className={icon} />
				</span>
			</div>
			<input 
				type={inputType}
				className={classnames('form-control form-control-lg', {'is-invalid': error})} 
				placeholder={inputPlaceholder} 
				name={inputName}
				value={inputValue} 
				onChange={onChangeInput}
			/>
			{error && (<div className="invalid-feedback">{error}</div>)}
		</div>
	)
};

InputIconGroup.propTypes = {
	type: propTypes.string.isRequired
}

InputIconGroup.defaultProps = {
	type: 'text'
}

export default InputIconGroup;
