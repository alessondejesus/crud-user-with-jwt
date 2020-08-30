var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const service = require('../service/user')
const Regex = require('../validations/userRegex')
const regex = new Regex()


class Controller {
    create = async (req, res) => {
        try {
            const { name, email, password } = req.body
            let user = await service.findByEmail(email)
            if (user) {
                return res
                    .status(401)
                    .json({
                        message: 'email not available'
                    })
            }
            if (!regex.validateAll(name, email, password)) {
                return res
                    .status(401)
                    .json({
                        message: 'name or password not available'
                    })
            }

            await service.save(name, email, bcrypt.hashSync(password, 9))
            user = await service.findByEmail(email)
            const token = jwt.sign(
                { id: user.id },
                process.env.JWT,
                { expiresIn: '1d' }
            )
            res
                .status(201)
                .json({
                    message: 'user has been created',
                    token
                })
        } catch (error) {
            console.log(error)
            res
                .status(500)
                .json({ message: 'internal server error' })
        }
    }
    delete = async (req, res) => {
        try {
            const [, token] = req.headers.authorization.split(' ')
            const { id } = await jwt.verify(token, process.env.JWT)
            if (await service.deleteUser(id)) {
                res
                    .status(200)
                    .json({
                        message: 'user has been deleted'
                    })
            } else {
                res
                    .status(401)
                    .json({
                        message: 'invalid token'
                    })
            }
        } catch (error) {
            console.log(error)
            res
                .status(500)
                .json({
                    message: 'internal server error'
                })
        }
    }
    show = async (req, res) => {
        try {
            //arrumar esses elses
            const { email, password } = req.body
            const user = await service.findByEmail(email)
            if (!regex.validateEmail(email) || !regex.validatePassword(password)) {
                return res
                    .status(401)
                    .json({
                        message: 'unauthorized'
                    })
            } else if (!user) {
                return res
                    .status(401)
                    .json({
                        message: 'unauthorized'
                    })
            } else if (!await bcrypt.compare(password, user.password)) {
                return res
                    .status(401)
                    .json({
                        message: 'unauthorized'
                    })
            }
            const token = jwt.sign(
                { id: user.id },
                process.env.JWT,
                { expiresIn: '1d' }
            )
            res
                .status(200)
                .json({
                    name: user.name,
                    email: user.email,
                    token
                })
        } catch (error) {
            console.log(error)
            res
                .status(500)
                .json({
                    message: 'internal server error'
                })
        }
    }
    edit = async (req, res) => {
        res.send({
            message: 'edit'
        })
    }
}

module.exports = new Controller()