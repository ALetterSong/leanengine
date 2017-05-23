/**
 * wxOauth.js
 *
 * Created by xiepan on 2016/11/29 下午12:57.
 */

var wxService = require('./wxService'),
    config = require('../config/config');

module.exports = function (req, res, next) {
    var code = req.query.code || '',
        token = req.cookies.Authorization;
    if (token) {
        return next()
    }
    wxService.getInfoFromWeixin(code, function (err, result) {
        if (err) {
            res.redirect(wxService.getAuthorizeURL(config.ng2domain + req.path, '', 'snsapi_userinfo'))
        }
        else if (result && result.subscribe) {

            res.render('login', {
                title: '登录',
            });

            // wxService.getToken(result, function (err, data) {
            //     if (err === null || err === '' || err === undefined) {
            //         res.cookie('Authorization', 'JWT ' + data.token)
            //         req.cookies.Authorization = 'JWT ' + data.token
            //         return next()
            //     }
            //     else {
            //         res.write('403');
            //         res.end()
            //     }
            // })

        }
        else {
            res.sendfile('./views/qrcode.html')
        }
    })
};