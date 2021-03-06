require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require("mongoose");
require("./db/connectToMongo")(mongoose);

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send('The server is running!') })

// Auth
app.post('/signin', (req, res) => { signin.handleSignin(req, res) })
app.post('/register', (req, res) => { register.handleRegister(req, res) })

app.put('/image', (req, res) => { image.handleImage(req, res) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

app.listen(process.env.PORT, () => {
  console.log(`app is running on port ${process.env.PORT}`);
})