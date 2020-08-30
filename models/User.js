const mongoose = require('../database')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

module.exports = User = mongoose.model('users', userSchema)