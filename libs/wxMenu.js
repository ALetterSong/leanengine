'use strict';
const fs = require('fs');
const request = require('request');

//token
const token = fs.readFileSync('./token').toString();
// const token = 'm8KxNBvwU08XTFwBj2M6LPC3eV0xP0aPX4Uv0CnaOz2tZ6pPE3Z4F-m_UwRhU8ZIXlNH5AuK7gpaxghbo623MkFDdsTla9r-0zbSr721fwmCq9VLgPelNlXxyUmLLSDRAHFfAGARYW';

//常用type为view和click,分别为点击事件和链接
var menus = {
    "button": [
        {
            "name": "关于我",
            "sub_button": [
                {
                    "type": "view",
                    "name": "访问我的博客",
                    "url": "http://haoduoyu.cc"
                }, {
                    "type": "view",
                    "name": "我的简历",
                    "url": "http://haoduoyu.cc/resume"
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

