import React from 'react'
import { useHistory } from 'react-router-dom'
import './home.css'

const CardHome = (props) =>{

	let history = useHistory()

	const goToPage = _ => history.push(props.link)

	return(
	<div className="card-home" onClick={() => goToPage()}>
		<div className="card-home-icon">
			<i className={`fa fa-${props.icon}`}></i>
		</div>
		<div className="card-home-text">
			<p>{props.text}</p>
		</div>
	</div>
	)
}

export default CardHome