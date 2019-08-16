const User = require('../Models/Users')

const helper = require('../helper')

const postForgetPassword = async (req, res) => {

	const { mail } = req.body;

	try {
		await checkMailExist(mail);
		// await 

	} catch (err) {
		console.log(err);
	}
}

const checkMailExist = async (mail) => {
	const doc = await User.findOne({ mail });
	if (!doc)
		throw "Mail doesnt exist ...!"
}

module.exports = postForgetPassword;