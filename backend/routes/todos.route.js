const {Router} = require('express')
const Todo = require('../models/Todo')

const router = Router()

router.post('/add', async (req, res) => {
	try {
		const {text, userId} = req.body

		res.status(200).json({
			msg: "Suss!"
		})
		console.log(text)
		console.log(userId)

	} catch (e) {
		console.log(e)
	}
})




module.exports = router
