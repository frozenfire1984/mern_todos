const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    text: {
        type: String
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    },
    completed: {
        type: Boolean,
        default: false
    },
    important: {
        type: Boolean,
        default: false
    },
})

module.exports = model('Todo', schema)