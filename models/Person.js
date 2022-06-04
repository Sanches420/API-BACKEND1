const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    name: String,
    email: String,
    rua: String,
    cidade: String,
    estado: String,
    password:String,
})

module.exports = Person