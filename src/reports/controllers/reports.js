const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const hbs = require('handlebars')
const path = require('path')
const helpers = require('./helpers')

// Get html content from template
const getTemplateContent = function (templateName) {
    const filePath = path.join(process.cwd(), './src/reports/templates', `${templateName}.hbs`)
    return fs.readFileSync(filePath, 'utf-8')
}

// Compiles the template with input data
const compile = async function (templateName, data) {
    const html = getTemplateContent(templateName)
    return hbs.compile(html)(data)
}

// Generate report
const generateReport = async (templateName, data) => {
    try {
        console.log(data)
        var data = {
            "content": data
        }

        // Init puppeteer
        const browser = await puppeteer.launch()
        // Creating a new page
        const page = await browser.newPage()
        // Calling compile function
        const content = await compile(templateName, data)

        // Configuring the page emulation
        await page.setContent(content)
        await page.emulateMedia('screen')
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                left: '10px',
                right: '10px'
            },
            displayHeaderFooter: false,
            headerTemplate: "", // should use it for repeating header in each page
            footerTemplate: "" // should use it for repeating footer in each page
        })
        console.log('Report gernerated sucessfully')
        await browser.close()
        return pdf
    } catch (e) {
        console.log(e)
    }
};

const getTemplates = async () => {
    try {
        var fileNames = fs.readdirSync(path.join(process.cwd(), './src/reports/templates'))
        for(var i = 0; i < fileNames.length; i++) {
            fileNames[i] = fileNames[i].replace(".hbs", "")
        }
        return fileNames
    } catch (e) {
        console.log(e)
    }
}

module.exports = { generateReport, getTemplates }