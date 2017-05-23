/**
 * wxCommon.js
 *
 * Created by xiepan on 2016/11/29 上午11:57.
 */

var config = require('../config/config'),
    API = require('wechat-api'),
    OAuth = require('wechat-oauth');
    // redis = require('redis'),

// var redisClient = redis.createClient({
//     retry_strategy: function (options) {
//         if (options.total_retry_time > 1000 * 60 * 5) {
//             return new Error('Retry time exhausted');
//         }
//         if (options.times_connected > 10) {
//             return undefined;
//         }
//         return Math.max(options.attempt * 100, 3000);
//     }
// });
//
// redisClient.on('error', function (err) {
//     logger.error(err)
// });

exports.client = new OAuth(config.appid, config.secret)
exports.wechatAPI = new API(config.appid, config.secret)