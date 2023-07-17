'use strict';

const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

async function logEvents(message, logName) {
    const dateTime = format(new Date(), 'yyyy.MM.dd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsp.mkdir(path.join(__dirname, '..', 'logs'));
        }
        // creates file if it doesn't exist, but can't create a folder!
        await fsp.appendFile(path.join(__dirname, '..', 'logs', logName), logItem)
    } catch(err) {
        console.error(err);
    }
}

function logger(req, res, next) {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

module.exports = { logEvents, logger };
