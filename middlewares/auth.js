const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res, next) => {
    try {
        const header = req.headers.authorization
        if (!header) {
            return res
                .status(401)
                .json({
                    message: 'token not found'
                })
        }
        const [, token] = header.split(' ')
        await jwt.verify(token, process.env.JWT)
        next()
    } catch (error) {
        console.log(error)
        res
            .status(401)
            .json({
                message: 'invalid token'
            })
    }
}