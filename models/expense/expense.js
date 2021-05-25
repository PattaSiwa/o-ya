const mongoose = require('mongoose')
const { Schema, model } = mongoose

const expenseSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a title'],
        unique: true,
        maxLength: [40, 'name cannot be more than 40 characters']
    },
    description: { type: String },
    amount: {
        type: Number,
        default: 0
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: { type: Date },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }
})

const Group = model('Group', expenseSchema)

module.exports = Group