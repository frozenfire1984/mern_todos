const {Router} = require('express')
const Todo = require('../models/Todo')
const {check, validationResult} = require('express-validator')
const delay = require('../utils/delay')

const router = Router()

router.post('/add',
	[
		check('text', 'text is empty').isLength({min: 1})
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					msg: 'Add todo: Field(s) is invalid '
				})
			}
			
			const {text, userId} = req.body
			
			const todo = await new Todo({
				text: text,
				owner: userId,
				completed: false,
				important: false
			})
			
			await todo.save()
			await delay(1000)
			res.status(201).json(todo)
		} catch (e) {
			console.log(e)
		}
	})

router.get('/', async (req, res) => {
	try {
		const todos = await Todo.find({owner: req.query.id})
		await delay(1000)
		res.status(200)
		res.json(todos)
	} catch (e) {
		console.log(e)
	}
})

router.delete('/', async (req, res) => {
	try {
		console.log(req.params)
		console.log(req.query)
		const todo = await Todo.findOneAndDelete({_id: req.query.id})
		await delay(1000)
		res.status(200)
		res.json(todo)
	} catch (e) {
		console.log(e)
	}
})

router.put('/', async (req, res) => {
	try {
		const todo = await Todo.findOne({_id: req.body.id})
		todo[req.query.type] = !todo[req.query.type]
		await todo.save()
		await delay(1000)
		res.status(200)
		res.json(todo)
	} catch (e) {
		console.log(e)
	}
})

module.exports = router
