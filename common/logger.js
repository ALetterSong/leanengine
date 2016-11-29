/**
 * logger.js
 *
 * Created by xiepan on 2016/11/29 下午12:33.
 */

var config = require('../config');
var env = process.env.NODE_ENV || "development";
var path = require('path');
var logDirectory = path.join(__dirname, '../logs/');
var fs = require('fs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'dateFile',
            filename: logDirectory + 'error',
            pattern: "-yyyy-MM-dd.log",
            alwaysIncludePattern: true,
            category: 'cheese',
        }]
});

var logger = log4js.getLogger('cheese');
// logger.setLevel(config.debug && env !== 'test' ? 'DEBUG' : 'ERROR')

module.exports = logger;