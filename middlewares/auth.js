const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = async (req, res, next) => {
    try {
        const {authorization} = req.headers
        const [, token] = authorization.split(' ')
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

module.exports = auth