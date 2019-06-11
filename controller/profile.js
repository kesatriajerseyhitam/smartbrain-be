const getProfile = (req, res, db) => {
  const { id } = req.params;
	db.select('*')
		.from('users')
		.where({ id: id })
		.then(user => {
			if (user.length < 1) { res.status(400).json(`There is no user with id ${id}`);
			} else { res.json(user[0]); }
		})
		.catch(err => res.status(400).json(err))
}

module.exports = {
  getProfile: getProfile
}