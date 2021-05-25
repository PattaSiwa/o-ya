const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        maxLength: [20, 'name cannot be more than 20 characters']
    },
    password: String
})

const User = model('User', userSchema)

module.exports = User
