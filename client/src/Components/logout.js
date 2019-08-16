import React from 'react'
import { withRouter } from 'react-router-dom';

import API from '../utils/api';

const Logout = (props) => {

	const onClick = () => {

		API.getLogout()
			.then((data) => {
				localStorage.clear();
				props.history.push('/login');
			})

	}

	return (
		<div>
			<button className="btn waves-effect waves-light red lighten-2" type="submit" onClick={onClick}>Logout</button>
		</div>
	)
}

export default withRouter(Logout);