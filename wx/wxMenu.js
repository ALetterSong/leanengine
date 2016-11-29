'use strict';
const fs = require('fs');
const request = require('request');
var wechatAPI = require('../common/weixin').wechatAPI;
var logger = require('../common/logger')

//token
// const token = fs.readFileSync('./token').toString();
const token = 'x61YhzYv4bScVmY3qUARoewL8OPv0JyUoryF6AxRmTzHeSbwIxURuN_EAD-L59SiTo6oSLcsNCwmM91WveySIEHvG3iV0Ml2Vk1eBnNdKJDtMFarFea1t_pc6Q8Tk7rZVVBeAAABBH';

//常用type为view和click,分别为点击事件和链接
var menus = {
    "button": [
        {
            "name": "Taidii",
            "sub_button": [
                {
                    "type": "view",
                    "name": "Taidii V2",
                    "url": "http://v2.taidii.com/"
                }, {
                    "type": "view",
                    "name": "精彩瞬间",
                    "url": "http://ng2.taidii.cn/"
                }]
        }]
};

function createMenu() {
    let options = {
        url: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=' + token,
        form: JSON.stringify(menus),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    request.post(options, function (err, res, body) {
        if (err) {
            console.log(err)
        } else {
            console.log(body);
        }
    })

}

module.exports = createMenu;

