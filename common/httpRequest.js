/**
 * remote.js
 *
 * Created by xiepan on 2016/11/29 下午12:37.
 */

var http = require('http');
var request = require('request');
var logger = require('../common/logger')

module.exports = {
    get: function (options, callback) {
        request(options, function (error, response, body) {
            if(error){
                callback(error)
            }
            else {
                var data = {};
                try {
                    data = JSON.parse(body)
                }
                catch (e) {
                    logger.error(body)
                    return callback(e)
                }
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    callback(null, data)
                }
                else if (response.statusCode == 403){
                    callback(403, data)
                }
                else {
                    logger.error(data.msg || data)
                    callback(data.msg || '系统繁忙,请稍后再试')
                }
            }
        })
    },

    post: function (options, postData, callback) {
        var req = http.request(options, function (res) {
            var body = ''
            res.on('data', function (chunk) {
                body += chunk;
            }).on('end', function () {
                try{
                    var data = JSON.parse(body);
                }
                catch (e){
                    logger.error(body)
                    return callback(e)
                }

                if (res.statusCode >= 200 && res.statusCode < 300) {
                    callback(null, data)
                }
                else if (response.statusCode == 403){
                    callback(403, data)
                }
                else {
                    logger.error('getToken' + body)
                    callback(data.msg || '系统繁忙,请稍后再试')
                }
            })
        });

        req.on('error', function (e) {
            logger.error('getToken' + e)
            callback(e)
        });

        req.write(postData);
        req.end();
    }
};