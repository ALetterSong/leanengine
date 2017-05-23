/**
 * wechat
 */
var router = require('express').Router();
// https://github.com/node-webot/wechat
var wxService = require('../wx/wxService');
var wxReply = require('../wx/wxReply');

wxService.createMenu();

router.use('/', wxReply);

module.exports = router;
