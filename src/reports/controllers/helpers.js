const Handlebars = require('handlebars')

//CPF handler
Handlebars.registerHelper('cpfHandler', function (cpf) {
    if (cpf) {
        return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 12)}`
    }
    return 'Not specified'
})

