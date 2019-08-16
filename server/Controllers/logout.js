const logout = (req, res) => {
	req.session.mail = null;

	res.status(200).json({});
}

module.exports = logout