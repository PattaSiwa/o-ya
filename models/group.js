const mongoose = require('mongoose')
const { Schema, model } = mongoose

const groupSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a title'],
        unique: true,
        maxlength: [40, 'name cannot be more than 40 characters']
    },
    members: { type: Array, default: [] },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.models.Group || model('Group', groupSchema)