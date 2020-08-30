const User = require('../models/User')

class Service {
    save = async (name, email, password) => {
        try {
            const user = new User({
                name,
                email,
                password
            })
            await user.save()
        } catch (error) {
            console.log(error)
            res
                .status(500)
                .json({
                    message: 'internal server error'
                })
        }
    }
    findByEmail = async (email) => {
        try {
            return await User.findOne({ email })
        } catch (error) {
            console.log(error)
            res
                .status(500)
                .json({
                    message: 'internal server error'
                })
        }
    }
    findById = async (id) => {
        try {
            return await User.findOne({ id })
        } catch (error) {
            console.log(error)
            res
                .status(500)
                .json({
                    message: 'internal server error'
                })
        }
    }
    deleteUser = async (id) => {
        try {
            return await User.findByIdAndRemove(id)
        } catch (error) {
            console.log(error)
            res
                .status(500)
                .json({
                    message: 'internal server error'
                })
        }
    }
}
module.exports = new Service()