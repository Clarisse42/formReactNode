import React from 'react'
import { withRouter } from 'react-router-dom';
import useForm from 'react-hook-form';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'materialize-css/dist/css/materialize.min.css';
import '../form.css';

import API from '../utils/api';
import Header from './header';


toast.configure({
	autoClose: 7000,
	draggable: false,
});


const Registration = (props) => {

	const { register, handleSubmit, errors } = useForm()
	const session = localStorage.getItem('mail');
	if (session)
		return props.history.push('/home')

	const onSubmit = data => {

		API.postRegistration(data)
			.then((data) => {
				toast.success("Registration succefully, please check your email to confirm your account ! ")
				props.history.push('/login');
			})
			.catch((error) => {
				const { err } = error.response.data;
				err.forEach(e => {
					document.getElementById(e.key).value = "";
					toast.error(e.message)
				});
			})
	};

	const changePage = () => {
		props.history.push('/login')
	}

	return (
		<div>
			<Header />

			<div className="row">
				<p className="title">Sign up !</p>
				<div className="form-style-8 mainStyle" >
					<form onSubmit={handleSubmit(onSubmit)}>

						<div class="row">
							<label style={{ fontSize: "16px" }}> First name</label>
							<input type="text" id="firstname" name="firstname" ref={register({ required: true })} />
							{errors.firstname && 'Required'}
						</div>

						<div class="row">
							<label style={{ fontSize: "16px" }}> Last name</label>
							<input type="text" id="lastname" name="lastname" ref={register({ required: true })} />
							{errors.lastname && 'Required'}
						</div>

						<div class="row">
							<label style={{ fontSize: "16px" }}> Mail</label>
							<input type="email" id="mail" name="mail" ref={register({ required: true })} />
							{errors.lastname && 'Required'}
						</div>

						<div class="row">
							<label style={{ fontSize: "16px" }}> Password</label>
							<input type="password" id="password" name="password" ref={register({ required: true })} />
							{errors.passwd1 && 'Required'}
						</div>

						<div class="row">
							<label style={{ fontSize: "16px" }}> Confirmation password</label>
							<input type="password" id="passwd2" name="passwd2" ref={register({ required: true })} />
							{errors.passwd1 && 'Required'}
						</div>
						<div className="row" >
							<button className="btn waves-effect waves-light red lighten-2" type="submit">Submit</button>
						</div>
						<div className="row" >
							Aleady have an account ? <a onClick={changePage}>Sign In</a>
						</div>
					</form>
				</div>
			</div>
		</div >
	)
}

export default withRouter(Registration)