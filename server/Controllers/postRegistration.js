const nodemailer = require("nodemailer");

const User = require("../Models/Users");
const helper = require("../helper");

const postRegistration = async (req, res) => {

	var userData = req.body;
	var error = [];

	try {
		await checkPassword(userData, error);
		await checkFirstname(userData, error);
		await checkLastname(userData, error);
		await checkMail(userData, error);
		await emailregex(userData, error);
		await passwdValidator(userData, error);
		await checkError(error);
		await saveDoc(userData)
		return res.status(200).json({});
	} catch (err) {
		return res.status(400).json({ err })
	}
}

const checkPassword = async ({ password, passwd2 }, error) => {
	if (password != passwd2) {
		error.push({ key: "password", message: "Password Different !" })
	}
}

const checkFirstname = async ({ firstname }, error) => {
	const regex = /^[A-Za-z]+$/i
	const res = regex.test(firstname)
	if (!res) {
		error.push({ key: "firstname", message: "Invalid Firstname ! " })
	}
}

const checkLastname = async ({ lastname }, error) => {
	const regex = /^[A-Za-z]+$/i
	const res = regex.test(lastname)
	if (!res) {
		error.push({ key: "lastname", message: "Invalid Lastname ! " })
	}
}

const checkMail = async ({ mail }, error) => {
	const doc = await User.findOne({ mail });
	if (doc) {
		error.push({ key: "mail", message: "Email exer exist !" });
	}
}

const emailregex = ({ mail }, error) => {
	const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	const res = regex.test(mail);
	if (!res) {
		error.push({ key: "mail", message: "Email not on a good format !" })
	}
}

const passwdValidator = ({ password }, error) => {
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
	const res = regex.test(password);
	if (!res) {
		error.push({ key: "password", message: "Password not on a good format !" })
	}
}

const checkError = (error) => {
	if (error.length > 0)
		throw error;
}

const saveDoc = async (userData) => {
	userData.token = helper.hashMail(userData);
	const newUser = new User(userData)
	const res = await newUser.save();
	if (!res) {
		throw "err";
	}
}

module.exports = postRegistration;