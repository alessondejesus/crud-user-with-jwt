var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const service = require('../service/user')
const Validate = require('../uteis/userRegex')
const validate = new Validate()


class Controller {
    create = async (req, res) => {
        try {
            const name = req.body.name
            const email = req.body.email
            const password = req.body.password

            
            let user = await service.findByEmail(email)
            if (validate.all(name, email, password)) {
                return res
                    .status(401)
                    .json({
                        message: 'name or password not available'
                    })
            }
            if (user) {
                return res
                    .status(401)
                    .json({
                        message: 'email not available'
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
            const decoded = await jwt.verify(token, process.env.JWT).id
            if (await service.deleteUser(decoded)) {
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
            const email = req.body.email
            const password = req.body.password
            const user = await service.findByEmail(email)
            if (!validate.email(email) || !validate.password(password)) {
                return res
                    .status(401)
                    .json({
                        message: 'unauthorized'
                    })
            }
            if (!user) {
                return res
                    .status(401)
                    .json({
                        message: 'unauthorized'
                    })
            }
            if (!await bcrypt.compare(password, user.password)) {
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