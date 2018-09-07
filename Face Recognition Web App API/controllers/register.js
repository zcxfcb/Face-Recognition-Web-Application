
const handleRegister = (req, res, db, bcrypt) => {
	const {email, password, name} = req.body;
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx('login').insert({
				hash: hash,
				email: email
			})
			.returning('email')
			.then(loginemail => {
				return trx('users')
					.returning('*')
					.insert({
						name: name,
						email: email,
						joined: new Date(),		
					})
					.then(user => {res.json(user[0])})
			})
			.then(trx.commit)
			.catch(trx.rollback)
	})
	.catch(err => {res.status(400).json('trx error')});
}

module.exports = {
	handleRegister: handleRegister
}
