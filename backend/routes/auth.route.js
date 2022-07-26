const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/signup',
    [
        check('email', 'invalid email').isEmail(),
        check('password', 'invalid password').isLength({min: 5})
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    msg: 'Sign up: Field(s) is invalid'
                })
            }

            const {email, password} = req.body
            const isused = await User.findOne({email})

            if (isused) {
                return res.status(300).json({
                    msg: 'This email already used! Try other email!'
                })
            }
            
            const hashPassword = await bcryptjs.hash(password, 12)

            const user = new User({
                email: email,
                password: hashPassword
            })

            await user.save()

            //res.setHeader("Access-Control-Allow-Origin", "*")
            res.status(201)
            res.json({msg: "User created!"})

        } catch (e) {
            console.log(new Error(e))
            throw new Error(e)
        }
})

router.post('/signin',
    [
        check('email', 'invalid email').isEmail(),
        check('password', 'invalid password').exists()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    msg: 'Sign in: field(s) is invalid'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({
                    msg: 'This user don\'t exists!'
                })
            }

            const isMatch = await bcryptjs.compare(password, user.password)
            console.log(user.password)
            console.log(password)
            console.log("IsMatch:" + isMatch)

            if (!isMatch) {
                return res.status(400).json({
                    msg: 'Invalid password'
                })
            }
            
            const jwtSecret = '123456789'
            
            const token = jwt.sign(
                {userId: user.id},
                jwtSecret,
                {expiresIn: '1h'}
            )

            res.status(200)
            res.json({
                msg: "User login!",
                token: token,
                userId: user.id
            })

        } catch (e) {
            console.log(new Error(e))
            //throw new Error(e)
        }
    })

router.get('/test', (req, res) => {
    res.status(200).setHeader("Content-Type", "text/plain")
    res.send("test!!!")
})

module.exports = router