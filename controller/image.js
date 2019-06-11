const detectImage = (req, res, db) => {
	clar.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => res.json(data))
	.catch(err => res.status(400).json(err))
}

const getEntries = (req, res, db) => {
  const { id } = req.body;
	db(`users`).where(`id`, `=`, id)
		.increment(`entries`, 1)
		.returning(`entries`)
		.then(entries => res.json(entries[0]))
		.catch(err => res.status(400).json(err))
}

module.exports = {
  detectImage: detectImage,
  getEntries:getEntries,
}