const mongoose = require('mongoose')
require('dotenv').config()

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('sucess database'))
    .catch(err => console.log('failed database ' + err))

module.exports = mongoose