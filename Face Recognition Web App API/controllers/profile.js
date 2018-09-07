const handleProfile = (req, res, db) => {
	const id = req.params.id;
	db('users').where('id',id)
	.then(user => {
		if(user.length > 0) {
			res.json(user[0])
		} else {
			res.status('400').json('error getting user')
		}
	}) 
}

module.exports = {
	handleProfile: handleProfile
}