require('body-parser')
class Regex {
    constructor() {
        //we need a better regex name
        this.regexName = /^[a-z]{4,20}$/
        this.regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        this.regexPassword = /^\S{4,30}$/
        this.serverMessageError = (res) => res.status(500).json({ message: 'internal server error' })
        this.unauthorizedMessageError = (res) => res.status(401).json({ message: 'unauthorized' })
    }
    validateName = (req, res, next) => {
        try {
            const { name } = req.body
            if (!this.regexName.test(name)) {
                this.unauthorizedMessageError(res)
            }
            next()
        } catch (error) {
            console.log(error)
            this.serverMessageError(res)
        }
    }
    validateEmail = (req, res, next) => {
        try {
            const { email } = req.body
            if (!this.regexEmail.test(email)) {
                this.unauthorizedMessageError(res)
            }
            next()
        } catch (error) {
            console.log(error)
            this.serverMessageError(res)
        }
    }
    validatePassword = (req, res, next) => {
        try {
            const { password } = req.body
            if (!this.regexPassword.test(password)) {
                this.unauthorizedMessageError(res)
            }
            next()
        } catch (error) {
            console.log(error)
            this.serverMessageError(res)
        }
    }
    validateAll = (req, res, next) => {
        try {
            const { name, email, password } = req.body
            if (this.regexName.test(name) && this.regexEmail.test(email) && this.regexPassword.test(password)) {
                return next()
            }
            this.unauthorizedMessageError(res)
        } catch (error) {
            console.log(error)
            this.serverMessageError(res)
        }
    }
}

module.exports = Regex