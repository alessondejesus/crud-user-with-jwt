/* modules */
const express = require('express')
const user = require('./routes/user')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
require('./config/database')


/* configs */
app
    .use((req, res, next) => {
        res
            .header("Access-Control-Allow-Origin", "*")
            .header("Access-Control-Allow-Headers", "GET, PUT, POST, DELETE")
        next()
    })
    .use(express.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(cors())

/* routes */
app
    .use('/user', user)
    .get('/', (req, res) => {
        res
            .json({
                message: 'Welcome to my app crud'
            })
    })

/* running server */
app.listen(process.env.PORT || 3000)