import React from 'react'
import { withRouter } from 'react-router-dom';

import Logout from './logout';
import Registration from './Registration';
import Header from './header';


const Home = (props) => {
	const session = localStorage.getItem('mail');
	if (!session) {
		return (<Registration />)
	}

	return (
		<div>
			<Header />
			<Logout />
		</div>
	)
}

export default withRouter(Home);