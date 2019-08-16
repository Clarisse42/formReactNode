import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import openSocket from 'socket.io-client';
import { toast } from 'react-toastify';


import Login from './Components/Login';
import Registration from './Components/Registration';
import ConfirmMail from './Components/confirmMail';
import Home from './Components/Home';
import ForgetPassword from './Components/forgetPassword';

import 'materialize-css/dist/css/materialize.min.css';


const PORT = 4242
const URL = process.env.NODE_ENV === 'production' ? '/' : `localhost:${PORT}`;


const App = () => {

	const socket = openSocket(URL);
	toast.configure({
		autoClose: 8000,
		draggable: false,
	});
	socket.on('disconnect', () => { toast.error("Vous avez été déconnecté du serveur ! --") })
	socket.on('connect_error', () => { toast.error("Erreur de connection au serveur ! --") })
	socket.on('reconnect', () => { toast.success("Vous êtes reconneté au serveur ! ++") })

	return (
		<div >
			<Switch>
				<Route exact path="/" component={Registration} />
				<Route path="/login" component={Login} />
				<Route path="/confirm" component={ConfirmMail} />
				<Route path="/home" component={Home} />
				<Route path="/forgetpassword" component={ForgetPassword} />
				<Route render={() => <Redirect to={{ pathname: "/" }} />} />
			</Switch>
		</div>
	);
}

export default App;
