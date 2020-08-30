var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Service = require('../service/user')
const service = new Service()


class Controller {
    createUser = async (req, res) => {
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
            await service.save(name, email, bcrypt.hashSync(password, 9))
            const { id } = await service.findByEmail(email)
            const token = jwt.sign(
                { id },
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
    deleteUser = async (req, res) => {
        try {
            const [, token] = req.headers.authorization.split(' ')
            const { id } = await jwt.verify(token, process.env.JWT)
            await service.deleteUser(id)
            res
                .status(200)
                .json({
                    message: 'user has been deleted'
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
    showUser = async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await service.findByEmail(email)
            if (user) {
                if (await bcrypt.compare(password, user.password)) {
                    const token = jwt.sign(
                        { id: user.id },
                        process.env.JWT,
                        { expiresIn: '1d' }
                    )
                    return res
                        .status(200)
                        .json({
                            token
                        })
                }
            } return res
                .status(401)
                .json({
                    message: 'unauthorized'
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
    editUser = async (req, res) => {
        res.send({
            message: 'edit'
        })
    }
}

module.exports = Controller