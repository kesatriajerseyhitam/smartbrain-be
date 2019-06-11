
const handleSignup = (req, res, db, bcrypt) => {
	if (!req.body.email) {
		res.status(400).json(`Required validation on email`);
	} else if (!req.body.password) {
		res.status(400).json(`Required validation on password`);
	} else if (!req.body.name) {
		res.status(400).json(`Required validation on name`);
	} else {
		const { email, name, password } = req.body;
		const hash = bcrypt.hashSync(password);
		db.transaction(trx => {
			trx.insert({
				hash: hash,
				email: email
			})
			.into(`login`)
			.returning(`email`)
			.then(loginEmail => {
				const newUser = {
					email	: loginEmail[0],
					name	: name,
					joined: new Date(),
				}
				return trx(`users`)
					.returning('*')
					.insert(newUser)
					.then(user => res.json(user))
					.catch(err => res.status(400).json(err));
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})

	}
}

module.exports = {
  handleSignup: handleSignup
}