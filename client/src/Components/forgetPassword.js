import React from 'react';
import { withRouter } from 'react-router-dom';
import useForm from 'react-hook-form';
import { toast } from 'react-toastify';

import Header from './header'
import API from '../utils/api'

import '../form.css'

const ForgetPassword = (props) => {
	const { register, handleSubmit, errors } = useForm()
	const session = localStorage.getItem('mail');
	if (session)
		return props.history.push('/home')

	const onSubmit = data => {

		API.postForgetPassword(data)
			.then((data) => {
				if (data.data.err == null) {
					toast.success("A reinitialization email has been sent to yout ! ")
				}
				else {
					// const errors = data.data.err;
					// errors.map((elem) => {
					// 	toast.error(elem.message)
					// 	document.getElementById(elem.key).value = "";
					// });
				}
			});
	};
	return (
		<div>
			<Header />
			<div className="row">
				<p className="title">Enter your mail !</p>
				<div className="form-style-8 mainStyle" >
					<form onSubmit={handleSubmit(onSubmit)}>

						<div className="row">
							<label style={{ fontSize: "20px" }}> Mail</label>
							<input type="email" id="mail" name="mail" ref={register({ required: true })} />
							{errors.firstname && 'Required'}
						</div>

						<div className="row" >
							<button className="btn waves-effect waves-light red lighten-2" type="submit">Submit</button>
						</div>

					</form>
				</div>
			</div>

		</div>
	)
}

export default withRouter(ForgetPassword);