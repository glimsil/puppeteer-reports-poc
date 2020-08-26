const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const reportRoute = require('./src/reports/routes/report.routes')
app.use(express.json());
app.get('/health', function (req, res) {
    res.send(`{"status": "ok", "port": ${port}}`)
})

app.use('/', reportRoute)

app.listen(port, function () {
    console.log(`API listen on port b ${port}`)
})

module.exports = app

