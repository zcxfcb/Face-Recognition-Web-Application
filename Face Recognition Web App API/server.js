const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const clarifai = require('clarifai')

const clarifaiAPI = new Clarifai.App({
 apiKey: '45ba7bbb64a34351b16480b35d4fef53'
});
const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  	ssl: true
  }
});
const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
	users: [{
		id: '11',
		name: 'Ken',
		email: 'zcx@gmail.com',
		password: '123',
		entries: 0,
		joined: new Date(),
	},
	{
		id: '12',
		name: 'Yang',
		email: 'y@gmail.com',
		password: '456',
		entries: 0,
		joined: new Date(),
	},
	]
}

app.post('/signin', (req, res) => {signIn.handleSignIn(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.get('/', (req, res) => {res.send('it\'s working');});

app.post('/imageAPI', (req, res) => {console.log(req.body.input);clarifaiAPI.models.predict("a403429f2ddf4b49b307e318f00e528b", req.body.input).then(resAPI =>{console.log(resAPI);res.json(resAPI)})})

app.listen(process.env.PORT || 3000, () => {console.log('Server running on', process.env.PORT);});