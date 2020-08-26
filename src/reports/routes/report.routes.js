const express = require('express')
const route = express.Router()
const { generateReport, getTemplates } = require('./../controllers/reports')

/*
The request body, its exactly the JSON expected by the template. 
An example:
[
    {"ID": "001", "NAME": "Gustavo", "EMAIL":"gustavo@aaa.com", "CPF":"00000000000"},
    {"ID": "002", "NAME": "John", "EMAIL":"john@bbb.com", "CPF":"00000000001"}
]
*/
route.post('/report/:templateName', function (req, res) {
    var data = req.body
    console.log(data)
    var templateName = req.params.templateName
    generateReport(templateName, data).then((pdf) => {
        res.type('application/pdf')
        res.send(pdf)
    }).catch((err) => {
        res.send(err)
    })
})

route.get('/template', function (req, res) {
    getTemplates().then((template) => {
        res.type('application/json')
        res.send(template)
    }).catch((err) => {
        res.send(err)
    })
})

module.exports = route

