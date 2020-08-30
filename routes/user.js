const express = require('express')
const auth = require('../middlewares/auth')
const Regex = require('../middlewares/userRegex')
const Controller = require('../controllers/user-controller')
const router = express.Router()
const controller = new Controller()
const regex = new Regex()

router
    .get('/', regex.validateEmail, regex.validatePassword, controller.showUser)
    .post('/', regex.validateAll, controller.createUser)
    .delete('/', auth, controller.deleteUser)
    .put('/', auth, controller.editUser)

module.exports = router