const mongoose = require('mongoose')
const { Schema, model } = mongoose

const expenseSchema = new Schema({
    description: { type: String },
    amount: {
        type: String,
        default: '0'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: { type: String },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    email: {
        type: String
    }
})


module.exports = mongoose.models.Expense || model('Expense', expenseSchema)