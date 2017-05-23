/**
 * wxReply.js
 *
 * Created by xiepan on 2016/11/29 下午3:37.
 */
var wechat = require('wechat');
var config = require('../config/config');
var string = require('../config/string');
var wxService = require('../wx/wxService')


module.exports = wechat(config, wechat.text(function (message, req, res) {
    console.log(message);
    var input = (message.Content || '').trim();

    if (input === 'login') {
        res.reply([{
            title: '登陆页面',
            description: '去登陆',
            picurl: 'http://7xq3d5.com1.z0.glb.clouddn.com/wall-6.jpg',
            url: 'http://ng2.taidii.cn/'
        }]);
        return;
    }

    if (input === '大王') {
        return res.reply("不要叫我大王，要叫我女王大人啊……");
    }

    return res.reply([{
        title: '泰迪系统',
        description: 'taidii',
        picurl: 'http://7xq3d5.com1.z0.glb.clouddn.com/wall-5.jpg',
        url: 'http://ng2.taidii.cn/'
    }])
}).image(function (message, req, res) {
    console.log(message);
    res.reply('还没想好图片怎么处理啦。');
}).location(function (message, req, res) {
    console.log(message);
    res.reply('想和我约会吗，不要的啦。');
}).voice(function (message, req, res) {
    console.log(message);
    res.reply('心情不好，不想搭理你。');
}).link(function (message, req, res) {
    console.log(message);
    res.reply('点连接进来的是吧！');
}).event(function (message, req, res) {
    console.log(message);
    if (message.Event === 'subscribe') {
        // 用户添加时候的消息
        res.reply('感谢关注');
    } else if (message.Event === 'unsubscribe') {
        res.reply('Bye!');
    } else if (message.Event === 'CLICK' && message.EventKey === 'jcsj') {
        // http://ng2.taidii.cn/
        var code = req.query.code || '';
        var url = wxService.getAuthorizeURL(config.ng2domain, '', 'snsapi_base');
        console.log(url);

        wxService.getInfoFromWeixin(code, function (err, result) {
            if (err) {
                res.reply(url);

                console.log(err);
                res.redirect(url);
                // res.reply([{
                //     title: '授权',
                //     description: '授权了',
                //     picurl: 'http://7xq3d5.com1.z0.glb.clouddn.com/wall-12.jpg',
                //     url: url
                // }])
            }

            else if (result && result.subscribe) {
                console.log('登录');
                res.render('login', {
                    title: '登录',
                });
            }

            else {
                console.log('不知道怎么了');
                res.reply('不知道怎么了！');

            }
        })
    } else if (message.Event === 'CLICK' && message.EventKey === 'td-click') {
        res.reply([{
            title: '点击按钮了',
            description: 'td-click',
            picurl: 'http://7xq3d5.com1.z0.glb.clouddn.com/wall-7.jpg',
            url: 'bing.com'
        }])
    } else if (message.Event === 'CLICK' && message.EventKey === 'qzyx') {
        res.reply([{
            title: '高端新加坡幼儿园插班体验',
            description: '泰迪教育',
            picurl: 'http://7xq3d5.com1.z0.glb.clouddn.com/wall-9.jpg',
            url: 'bing.com'
        }])
    } else if (message.Event === 'CLICK' && message.EventKey === 'jyztc') {
        res.reply([{
            title: '教育直通车',
            description: '泰迪教育',
            picurl: 'http://7xq3d5.com1.z0.glb.clouddn.com/wall-10.jpg',
            url: 'bing.com'
        }])
    } else if (message.Event === 'CLICK' && message.EventKey === 'ios') {

        res.reply(string.ios)

    } else if (message.Event === 'CLICK' && message.EventKey === 'android') {

        res.reply(string.anroid)

    } else {
        res.reply('暂未支持! Coming soon!');
    }
}))
;