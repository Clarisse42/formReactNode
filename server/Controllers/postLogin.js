const bcrypt = require("bcrypt")
const User = require("../Models/Users");


const postLogin = async (req, res) => {
	try {
		await checkMailExist(req.body);
		req.session.mail = req.body.mail;
		return res.json({ err: null })
	} catch (err) {
		console.log(err);
		if (Array.isArray(err) && err.length > 0) {
			return res.status(400).json({ err });
		}
		else if (typeof err == "string") {
			return res.status(400).json({ err });
		}
		throw err;
	}
};

const checkMailExist = async ({ mail, password }) => {
	const doc = await User.findOne({ mail });
	console.log(doc)
	if (!doc) {
		throw [{ key: "mail", message: "Mail doesnt exist !" }];
	} else if (!(await bcrypt.compare(password, doc.password))) {
		throw [{ key: "password", message: "Bad Password" }];
	} else if (!!doc.token) {
		throw [{ key: null, message: "You didn't confirm your account !" }];
	} else {
		return doc;
	}
};


module.exports = postLogin
