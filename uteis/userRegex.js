class Validate {
    constructor() {
        this.regexName = /^[^\s]{4,20}$/
        this.regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        this.regexPassword = /^\S{4,30}$/
    }
    name = name => this.regexName.test(name)
    email = email => this.regexEmail.test(email)
    password = password => this.regexPassword.test(password)
    all = (name, email, password) => {
        if (this.regexName.test(name) && this.regexEmail.test(email) && this.regexPassword.test(password)) {
            return true
        }
        return false
    }
}

module.exports = Validate