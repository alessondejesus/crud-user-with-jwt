const express = require('express')
const auth = require('../middlewares/auth')
const controller = require('../controllers/user-controller')
require('body-parser')
const router = express.Router()

router
    .get('/', controller.show)
    .post('/', controller.create)
    .delete('/', auth, controller.delete)
    .put('/', auth, controller.edit)

module.exports = router