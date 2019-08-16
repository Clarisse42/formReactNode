const User = require("../Models/Users");

const getConfirmMail = (req, res) => {

	const token = req.query.token;

	User.updateOne({ token }, { token: null }, (err, doc) => {
		res.status(200).json({});
	})

}

module.exports = getConfirmMail