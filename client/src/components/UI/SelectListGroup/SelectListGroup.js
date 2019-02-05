import React from 'react';
import classnames from 'classnames';

const SelectListGroup = props => {
	const {
		inputName, 
		inputValue,
		options, 
		info, 
		onChangeInput,  
		error ,
		

	} = props

	const selectOptions = options.map(option => {
		return (
			<option key={option.label} value={option.value}>
				{option.label}
			</option>
		)
	})

	return (
		<div className="form-group">
			<select
				className={classnames('form-control form-control-lg', {
					'is-invalid': error
				})}
				name={inputName}
				value={inputValue}
				onChange={onChangeInput}
			>
				{ selectOptions }
			
			</select>

			{error && (<div className="invalid-feedback">{error}</div>)}
			{
				info 
				? 
					<small className="form-text text-muted">{ info }</small>
				: 
					null
			}
		</div>
	)
}

export default SelectListGroup
