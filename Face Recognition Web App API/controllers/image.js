const handleImage = (req, res, db) => {
	const id = req.body.id;
	db('users').returning('*').where('id','=',id).increment('entries', 1)
	.then(user => {
		if (user.length) {
			res.json(user[0])
		} else {
			res.status('400').json('No Such User')
		}
	})
	.catch(err => {res.status('400').json('error finding entries')})
}

module.exports = {
	handleImage: handleImage
};