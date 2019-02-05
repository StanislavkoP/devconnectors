import React from 'react';
import classnames from 'classnames';

const textGroupField = props => {
	const { 
		inputType, 
		inputPlaceholder, 
		inputName, 
		inputValue, 
		info, 
		onChangeInput,  
		error,
		disabled
	} = props

	return (
		<div className="form-group">
			<input 
				type={inputType}
				className={classnames('form-control form-control-lg', {'is-invalid': error})} 
				placeholder={inputPlaceholder} 
				name={inputName}
				value={inputValue} 
				onChange={onChangeInput}
				disabled={disabled}
			/>
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

export default textGroupField
