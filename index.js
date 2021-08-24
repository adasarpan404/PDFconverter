#!/usr/bin/env node
const handlebars = require("handlebars")
var pdf = require("html-pdf");

var convert = (doc, opt) => {
    return new Promise((resolve, reject) => {
        if (!doc || !doc.html || !doc.data) {
            reject(new Error("some, or all , options are missing."))
        }
        var HTML = handlebars.compile(doc.html)(doc.data);
        var Promise = pdf.create(HTML, opt)

        switch (doc.type) {
            case "buffer":
                Promise.toBuffer((err, res) => {
                    if (!err) resolve(res);
                    else reject(err);
                });
                break;
            case "stream":
                PromiseFor.toStream((err, res) => {
                    if (!err) resolve(res);
                    else reject(err);
                });
                break;
            default:
                PromiseFor.toFile(document.path, (err, res) => {
                    if (!err) resolve(res);
                    else reject(err);
                });
                break;
        }
    })
};

module.exports.convert = convert;