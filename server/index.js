require('dotenv').config();
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')


// middleware
const checkForSession = require('./middleware/checkForSession')

// controllers
const sc = require('./controllers/swag_controller')
const ac = require('./controllers/auth_controller')
const cc = require('./controllers/cart_controller')

const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession);

// swag endpoints
app.get('/api/swag', sc.read);

// auth controller end points
app.post('/api/login', ac.login)
app.post('/api/register', ac.register)
app.post('/api/signout', ac.signout)
app.get('/api/user', ac.getUser)

// cart controller end points
app.post('/api/cart', cc.add)
app.post('/api/cart/checkout', cc.checkout)
app.delete('/api/cart', cc.delete)

const SERVER_PORT = process.env.SERVER_PORT;
app.listen(SERVER_PORT, () => { console.log(`Listening on port: ${SERVER_PORT}`) })