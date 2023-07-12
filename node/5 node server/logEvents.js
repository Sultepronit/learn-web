'use strict';

const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

async function logEvents(message) {
    const dateTime = format(new Date(), 'yyyy.MM.dd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try {
        if(!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsp.mkdir(path.join(__dirname, 'logs'));
        }
        // creates file if it doesn't exist, but can't create a folder!
        await fsp.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem)
    } catch(err) {
        console.error(err);
    }
}

module.exports = logEvents;
