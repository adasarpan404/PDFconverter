#!/usr/bin/env node
const handlebars = require("handlebars")
var pdf = require("html-pdf");

var convert = (doc, opt) => {
    return new Promise((resolve, reject) => {
        if (!doc || !doc.html || !doc.data) {
            return reject(new Error("some, or all , options are missing."))
        }
        var HTML = handlebars.compile(doc.html)(doc.data);
        var pdfPromise = pdf.create(HTML, opt)

        switch (doc.type) {
            case "buffer":
                pdfPromise.toBuffer((err, res) => {
                    if (!err) resolve(res);
                    else reject(err);
                });
                break;
            case "stream":
                pdfPromise.toStream((err, res) => {
                    if (!err) resolve(res);
                    else reject(err);
                });
                break;
            default:
                pdfPromise.toFile(doc.path || 'output.pdf', (err, res) => {
                    if (!err) resolve(res);
                    else reject(err);
                });
                break;
        }
    })
};

module.exports.convert = convert;