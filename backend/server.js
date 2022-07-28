const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const port = 5000
const url = "mongodb://localhost:27017/todos";

app.use(cors())
app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/todo', require('./routes/todos.route'));

app.post('/test_post', (req, res) => {
    res.status(200).setHeader("Content-Type", "text/plain")
    //const {test} = req.body
    //console.log(test)
    res.send("Postman кусок гавна")
    console.log(req.body)
    //res.end()
    //console.log(req.body)
});

(async function () {
    try {
        await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        app.listen(port, () => {
            console.log(`Server started on port ${port}`)
        })
    } catch (e) {
        throw new Error(e)
    }
}()).then(() => {
    //console.log("db connect")
}).catch((e) => {
    console.log("ERROR!")
    console.log(e)
})

process.on("SIGINT", () => {
    console.log("exit!")
    mongoose.disconnect().then(() => {
        console.log("db disconnected!")
        process.exit();
    })
});