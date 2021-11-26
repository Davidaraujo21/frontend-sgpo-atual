import React from 'react'


const AlertTemplate = ({options, message, close}) =>(
	<div className={`alert alertas alert-${options.type === 'error' ? 'danger': options.type}`}>
    	{message}
	</div>
)

export default AlertTemplate