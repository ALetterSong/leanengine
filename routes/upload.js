'use strict';
var router = require('express').Router();
var AV = require('leanengine');

router.post('/', function (req, res) {
    if (req.busboy) {
        var base64data = [];
        var pubFileName = '';
        var pubMimeType = '';
        req.busboy.on('file', (fieldname, file, fileName, encoding, mimeType) => {
            console.log('filedname:', fieldname)
            console.log('file:', file.toString())
            console.log('fileName:', fileName)
            console.log('encoding:', encoding)
            console.log('mimeType:', mimeType)
            var buffer = '';
            pubFileName = fileName;
            pubMimeType = mimeType;
            file.setEncoding('base64');
            file.on('data', function (data) {
                buffer += data;
            }).on('end', function () {
                base64data.push(buffer);
            });
        }).on('finish', function () {
            var f = new AV.File(pubFileName, {
                // 仅上传第一个文件（多个文件循环创建）
                base64: base64data[0]
            });
            try {
                f.save().then(function (fileObj) {
                    // 向客户端返回数据
                    res.send({
                        fileId: fileObj.id,
                        mimeType: fileObj.metaData().mime_type,
                        name: fileObj.name(),
                        url: fileObj.url()
                    });
                });
            } catch (err) {
                console.log('uploadFile - ' + err);
                res.status(502);
            }
        })
        req.pipe(req.busboy);
    } else {
        console.log('uploadFile - busboy undefined.');
        res.status(502);
    }
})

module.exports = router;
