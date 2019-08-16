
import axios from 'axios';

const headers = {
	'Content-Type': 'application/json'
}

const burl = "http://localhost:4242"


const postRegistration = (userData) => {
	return axios.post(burl + '/registration', userData, { headers: headers })
}

const postLogin = (userData) => {
	return axios.post(burl + '/login', userData, { headers: headers })
}

const getConfirmMail = (token) => {
	return axios.get(burl + '/confirm?token=' + token, null, { headers: headers });
}

const getLogout = () => {
	return axios.get(burl + '/logout', null, { headers: headers });
}

const postForgetPassword = (mail) => {
	return axios.post(burl + '/forgetpassword', mail, { headers: headers });
}

export default {
	postRegistration,
	postLogin,
	getConfirmMail,
	getLogout,
	postForgetPassword
}