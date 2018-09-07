
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const user = {
	name: 'Ken',
	age: 18,
}

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.get('/', (req, res) => {res.send({user});});

app.get('/profile', (req, res) => {
			res.send("getting profile");
		}
);

app.post('/profile', (req, res) => {
			res.send("posting profile");
			console.log(req.body);
		}
);

app.listen(3000);