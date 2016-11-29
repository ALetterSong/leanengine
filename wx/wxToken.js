'use strict';
var qs = require('querystring');
var fs = require('fs');
var config = require('../config');

var remote = require('../common/httpRequest');


var getAccessToken = function () {
    var queryParams = {
        'grant_type': 'client_credential',
        'appid': config.appid,
        'secret': config.secret
    };

    var wxGetAccessTokenBaseUrl = 'https://api.weixin.qq.com/cgi-bin/token?' + qs.stringify(queryParams);
    var options = {
        method: 'GET',
        url: wxGetAccessTokenBaseUrl
    };

    return new Promise((resolve, reject) => {
        remote.get(options, function (err, res, body) {
            if (res) {
                resolve(JSON.parse(body));
            } else {
                reject(err);
            }
        });
    })
};

var saveToken = function () {
    getAccessToken()
        .then(res => {
            var token = res['access_token'];
            fs.writeFile('./token', token, function (err) {

            });
        })
};

var refreshToken = function () {
    saveToken();
    setInterval(function () {
        saveToken();
    }, 7000 * 1000);
};

module.exports = refreshToken;