const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../constans/config')
const delay = require('../utils/delay')

const regexp_password_numbers = new RegExp(`[0-9]{${config.password_min_number_symbols}}`)
const regexp_password_uppercase = new RegExp(`[A-Z]{${config.password_min_uppercase_symbols}}`)
const regexp_password_special_symbols = new RegExp(`[!@#$%^&*)(+=._-]{${config.password_min_special_symbols}}`)
const regexp_prohibited_domains_2lvl_list = new RegExp(`.+?@(${config.email_prohibited_domains_2lvl.join('|')})\..+`)
const regexp_prohibited_domains_1lvl_list = new RegExp(`.+?@.+?\.(${config.email_prohibited_domains_1lvl.join('|')})`)
const regexp_prohibited_words = new RegExp(`${config.email_prohibited_words.join('|')}`, 'i')

router.post('/signup',
	[
		check('email')
			.isEmail()
			.withMessage('Invalid email')
			
			.not()
			.matches(regexp_prohibited_domains_2lvl_list)
			.withMessage('this email domain 2st level is prohibited!')
			
			.not()
			.matches(regexp_prohibited_domains_1lvl_list)
			.withMessage('this email domain 1st level is prohibited!')
			
			.not()
			.matches(regexp_prohibited_words)
			.withMessage('this email has prohibited words!')
			
			.custom(async (value, {req}) => {
				const existingUser = await User.findOne({email: req.body.email})
				if (existingUser) {
					throw new Error('This email already used! Try other email!')
				}
			}),
		check('password')
			.isLength({min: config.password_min_length})
			.withMessage(`password must be at least ${config.password_min_length} chars long`)
			.isLength({max: config.password_max_length})
			.withMessage(`password must be at max ${config.password_max_length} chars long`)
			.matches(regexp_password_numbers)
			.withMessage(`must contain a least ${config.password_min_number_symbols} number`)
			.matches(regexp_password_uppercase)
			.withMessage(`must contain a least ${config.password_min_uppercase_symbols} uppercase symbol`)
			.matches(regexp_password_special_symbols)
			.withMessage(`must contain a least ${config.password_min_special_symbols} special symbol`)
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			
			if (!errors.isEmpty()) {
				return res.status(400).send({
					type: 'express-validator',
					errors: errors.array(),
					msg: 'Sign up: Field(s) is invalid'
				})
			}
			
			const {email, password} = req.body
			
			const hashPassword = await bcryptjs.hash(password, 12)
			
			const user = await new User({
				email: email,
				password: hashPassword
			})
			
			await user.save()
			res.status(201)
			res.json({msg: 'User created!'})
			
		} catch (e) {
			console.log(new Error(e))
			throw new Error(e)
		}
	})

router.post('/signin',
	[
		check('email')
			.notEmpty()
			.withMessage('password is empty!')
			.isEmail()
			.withMessage('invalid email'),
		check('password')
			.notEmpty()
			.withMessage('password is empty!')
	],
	async (req, res) => {
		try {
			await delay(1500)
			const errors = validationResult(req)
			
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					msg: 'Sign in: field(s) is invalid'
				})
			}
			
			const {email, password} = req.body
			
			if (email === 'bad@gmail.com') {
				return res.status(403).json({
					type: 'email',
					msg: 'This email is prohibited'
				})
			}
			
			const user = await User.findOne({email})
			
			if (!user) {
				return res.status(400).json({
					type: 'email',
					msg: 'This user don\'t exists!'
				})
			}
			
			const isMatch = await bcryptjs.compare(password, user.password)
			
			if (!isMatch) {
				return res.status(400).json({
					type: 'password',
					msg: 'Invalid password'
				})
			}
			
			const jwtSecret = '12345'
			
			const token = jwt.sign(
				{userId: user.id},
				jwtSecret,
				{expiresIn: '1h'}
			)
			
			res.status(200)
			res.json({
				msg: 'User login!',
				token: token,
				userId: user.id
			})
			
		} catch (e) {
			console.log(new Error(e))
			throw new Error(e)
		}
	})
module.exports = router