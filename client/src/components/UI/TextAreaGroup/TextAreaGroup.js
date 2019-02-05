import React from 'react';
import classnames from 'classnames';

const TextAreaGroup = props => {
	const { 
		inputPlaceholder, 
		inputName, 
		inputValue, 
		info, 
		onChangeInput,  
		error
	
	} = props

	return (
		<div className="form-group">
			<textarea 
				className={classnames('form-control form-control-lg', {'is-invalid': error})} 
				placeholder={inputPlaceholder} 
				name={inputName}
				value={inputValue} 
				onChange={onChangeInput}
			/>
			{ error && ( <div className="invalid-feedback">{error}</div> ) }
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

export default TextAreaGroup
