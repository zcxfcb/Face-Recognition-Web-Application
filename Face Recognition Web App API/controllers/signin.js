const handleSignIn = (req, res, db, bcrypt) => {
	const {email, password} = req.body;
	db('login').returning('*').where('email', '=', email)
	.then(user => {
		console.log(user[0]);
		if(user.length && bcrypt.compareSync(password, user[0].hash)) {
			return db('users').returning('*').where('id','=',user[0].id)
				.then(data => {
					console.log(data);
					const {id, name, email, entries, joined} = data[0]; 
				 	res.json({
						id: id,
						name: name,
						email: email,
						entries: entries,
						joined: joined,
					});
				})
		} else {
			res.json('incorrect')
		}
	})
	}

	module.exports = {
		handleSignIn: handleSignIn
	}
	