const { format } = require('date-fns')
const { v4: uuidv4 } = require('uuid')

const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'ddMMyyyy\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`
    console.log(logItem)
    try {
        if (!fs.existsSync(path.join(__dirname,'..','logs'))) {
            await fsPromises.mkdir(path.join(__dirname,'..','logs'))
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',logName), logItem)
    } catch (err) {
        console.error(err)
    }
}

const logDate = `${format(new Date(), 'yyyy-MM-dd')}`

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, `${logDate}` + '_reqLog.log')
    // console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = { logger, logEvents }