import React from 'react'
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';

import API from '../utils/api'

const confirmMail = (props) => {
	const url = props.location.search;
	const params = queryString.parse(url);
	API.getConfirmMail(params.token)
		.then((data) => {
			props.history.push('/login');
		})


	return (
		<div>fsfsd</div>
	)

}

export default withRouter(confirmMail);