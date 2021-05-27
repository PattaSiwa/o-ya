const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: [40, 'name cannot be more than 40 characters']
    },
    password: String
})



module.exports = mongoose.models.User || model('User', userSchema)
