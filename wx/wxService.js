/**
 * wxService.js
 *
 * Created by xiepan on 2016/11/29 上午11:57.
 */

var wechatAPI = require('./wxCommon').wechatAPI,
    client = require('./wxCommon').client,

    config = require('../config/config'),
    // jwt = require('jsonwebtoken'),
    remote = require('../common/httpRequest');

module.exports = {
    /**
     * 移动端微信跳转页面
     * @param redirect
     * @param state
     * @param scope
     */
    getAuthorizeURL: function (redirect, state, scope) {
        console.log('wxService.getAuthorizeURL');
        console.log(redirect);
        console.log(state);
        console.log(scope);
        return client.getAuthorizeURL(redirect, state, scope)
    },

    /**
     * 根据参数获取微信jssdk配置信息
     * @param param
     * @param callback
     */
    getJSConfig: function (param, callback) {
        wechatAPI.getJsConfig(param, function (err, result) {
            callback(err, result)
        });
    },

    /**
     * 根据code获取用户信息(unionID机制)
     * @param code
     * @param callback
     */
    getInfoFromWeixin: function (code, callback) {
        if (!code) {
            return callback('NoCode')
        }
        client.getUserByCode(code, function (err, result) {
            if (err === null || err === undefined || err === '') {
                wechatAPI.getUser(result.openid, function (err, result) {
                    callback(err, result)
                })
            }
            else {
                console.error('getInfoFromWeixin:' + err)
                callback(err, result)
            }
        })
    },

    /**
     * 生成token
     * @returns {*}
     */
    // createToken: function () {
    //     return jwt.sign({
    //         app_key: config.app_key,
    //         time: Math.floor(Date.now() / 1000),
    //         nonce: 'adgj'
    //     }, config.app_secret)
    // },

    /**
     * @params user
     */
    getToken: function (user, callback) {
        var info = {};
        if (user && user.openid && user.nickname) {
            info = {
                "openid": user.openid,
                "nickname": user.nickname
            }
        }
        var postData = JSON.stringify(info);

        var options = {
            host: config.login.host,
            port: config.login.port,
            path: config.login.path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData, 'utf8')
            }
        };

        remote.post(options, postData, callback)

    },


    createMenu: function () {
        var menus = require('../config/menus.json')

        wechatAPI.createMenu(menus, function (err, result) {
            if (err) {
                console.error(err)
            }
            console.log(result)

        });
    }
}
