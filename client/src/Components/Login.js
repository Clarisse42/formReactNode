import React, { useState } from 'react'
import useForm from 'react-hook-form';
import ReCAPTCHA from "react-google-recaptcha";
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'materialize-css/dist/css/materialize.min.css';
import '../form.css'

import API from '../utils/api'
import Home from './Home'
import Header from './header'


toast.configure({
	autoClose: 7000,
	draggable: false,
});

const Login = (props) => {

	const { register, handleSubmit, errors } = useForm();
	const [captcha, setCaptcha] = useState("");

	const session = localStorage.getItem('mail');

	if (session)
		return (<Home />)

	const onSubmit = data => {
		if (captcha === "") {
			console.log('Click connard')
		}
		else {
			API.postLogin(data)
				.then((data) => {
					localStorage.setItem('mail', data.mail);
					return props.history.push('/home')
				}).catch(error => {
					const { err } = error.response.data;
					err.forEach(e => toast.error(e.message));
				});
		}
	}

	const onClickCaptcha = (value) => {
		setCaptcha(value);
	}

	const registerPage = () => { props.history.push('/') }
	const changePasswordPage = () => { props.history.push('/forgetpassword') }

	return (
		<div>
			<Header />
			<div className="row">
				<p className="title">Sign in !</p>
				<div className="form-style-8 mainStyle">
					<form onSubmit={handleSubmit(onSubmit)}>

						<div className="row">
							<label style={{ fontSize: "20px" }}> Mail</label>
							<input type="email" id="mail" name="mail" placeholder="" ref={register({ required: true })} />
							{errors.lastname && 'Required'}
						</div>

						<div className="row">
							<label style={{ fontSize: "20px" }}>Password</label>
							<input type="password" id="password" name="password" placeholder="" ref={register({ required: true })} />
							{errors.passwd1 && 'Required'}
						</div>

						<div className="row">
							<ReCAPTCHA
								sitekey="6LdhDLMUAAAAAJy7uAkyi1QMlENyPH5cr3EUkzBt"
								onChange={onClickCaptcha}
							/>
						</div>

						<div className="row">
							<button className="btn waves-effect waves-light red lighten-2" type="submit">LOG IN</button>
						</div>

						<div className="row" >
							Don't have an account ? <a onClick={registerPage}>Sign Up</a>
						</div>

						<div className="row" >
							Forget password ? <a onClick={changePasswordPage}>Click here</a>
						</div>

					</form>
				</div>
			</div >
		</div >
	)
}

export default withRouter(Login);