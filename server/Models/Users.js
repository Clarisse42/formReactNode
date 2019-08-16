const mongoose = require("mongoose")
const help = require('../helper');

let userSchema = new mongoose.Schema({
	password: {
		type: String,
		required: true,
		trim: true,
		set: help.hashPassword
	},
	firstname: {
		type: String,
		required: true,
		trim: true,
	},
	lastname: {
		type: String,
		required: true,
		trim: true,
	},
	mail: {
		type: String,
		required: true,
		trim: true,
	},
	token: {
		type: String,
		default: null
	}
});

module.exports = mongoose.model('User', userSchema);


// let userSchema = new mongoose.Schema({
// 	password: {
// 		type: String,
// 		required: true,
// 		trim: true,
// 		set: help.hashPassword,
// 		validate: { validator: help.passwdValidator, message: "Invalid password" }
// 	},
// 	firstname: {
// 		type: String,
// 		required: true,
// 		trim: true,
// 		validate: { validator: help.nameValidator, message: "Invalid firstname" }
// 	},
// 	lastname: {
// 		type: String,
// 		required: true,
// 		trim: true,
// 		validate: { validator: help.nameValidator, message: "Invalid lastname" }
// 	},
// 	mail: {
// 		type: String,
// 		required: true,
// 		trim: true,
// 		validate: { validator: help.emailregex, message: "Invalid email" }
// 	},
// 	token: {
// 		type: String,
// 		default: null
// 	}
// });