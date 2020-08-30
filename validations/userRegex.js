class Regex {
    constructor() {
        this.regexName = /^[a-z]{4,20}$/
        this.regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        this.regexPassword = /^\S{4,30}$/
    }
    validateName = name => this.regexName.test(name)
    validateEmail = email => this.regexEmail.test(email)
    validatePassword = password => this.regexPassword.test(password)
    validateAll = (name, email, password) => {
        //melhorar isso, usuario pode conter espaços
        if (!this.regexName.test(name) & !this.regexEmail.test(email) & !this.regexPassword.test(password)) {
            return false
        }
        return true
    }
}

module.exports = Regex