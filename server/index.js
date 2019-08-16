const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session')

const login = require("./Controllers/postLogin");
const registration = require("./Controllers/postRegistration");
const confirmMail = require("./Controllers/getConfirmMail")
const logout = require('./Controllers/logout');
const forgetPassword = require('./Controllers/postForgetPasword')

const app = express();
const server = http.createServer(app);

// Express
app.use(cors());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}))
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// ROUTES

app.post('/login', login);
app.post('/registration', registration);
app.post('/forgetpassword', forgetPassword)
app.get('/confirm', confirmMail)
app.get('/logout', logout)


// Mongoose
mongoose.connect('mongodb://localhost/jojo', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('==> Mongo connection')
});

//Sockets
const io = socketio.listen(server);
io.on('connection', (socket) => {
	console.log('==> Socket OK')
});

server.listen(4242);