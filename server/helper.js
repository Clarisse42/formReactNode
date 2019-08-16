const bcrypt = require("bcrypt")

const hashMail = ({ mail }) => {
	const salt = bcrypt.genSaltSync(10);
	const hashMail = bcrypt.hashSync(mail, salt);
	return hashMail;
}

const hashPassword = (passwd) => {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(passwd, salt);
}


module.exports = {
	hashPassword,
	hashMail
}