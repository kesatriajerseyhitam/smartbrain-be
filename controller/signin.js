const handleSignin = (req, res, db, bcrypt) => {
  if (!req.body.email) {
		res.status(400).json(`Required validation on email`);
	} else if (!req.body.password) {
		res.status(400).json(`Required validation on password`)
	} else {
		db.select(`email`, `hash`).from(`login`)
			.where(`email`, `=`, req.body.email)
			.then(data => {
				const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
				if (isValid) {
					return db.select(`*`).from(`users`)
						.where(`email`, `=`, req.body.email)
						.then(user => res.json(user[0]))
						.catch(err => res.status(400).json(err))
				}
			})
			.catch(err => res.status(400).json(`Wrong credential`));
	}
}

module.exports = {
  handleSignin: handleSignin
}