const { expect } = require('chai');
const { convert } = require('../index');

describe('convert', () => {
    it('rejects when doc is null or undefined', async () => {
        try {
            await convert(null);
            throw new Error('Expected function to reject');
        } catch (err) {
            expect(err).to.be.an('error');
            expect(err.message).to.match(/options are missing/);
        }
    });

    it('rejects when html is missing', async () => {
        try {
            await convert({ data: {} });
            throw new Error('Expected function to reject');
        } catch (err) {
            expect(err).to.be.an('error');
            expect(err.message).to.match(/options are missing/);
        }
    });

    it('rejects when data is missing', async () => {
        try {
            await convert({ html: '<p>{{foo}}</p>' });
            throw new Error('Expected function to reject');
        } catch (err) {
            expect(err).to.be.an('error');
            expect(err.message).to.match(/options are missing/);
        }
    });

    it('resolves with a buffer when type is buffer', async () => {
        const pdf = require('html-pdf');
        const originalCreate = pdf.create;
        let capturedHtml = null;
        pdf.create = (html, opt) => {
            capturedHtml = html;
            return {
                toBuffer: (cb) => cb(null, Buffer.from('PDF_OK'))
            };
        };

        try {
            const res = await convert({ html: '<p>{{foo}}</p>', data: { foo: 'bar' }, type: 'buffer' }, {});
            expect(Buffer.isBuffer(res)).to.be.true;
            expect(res.toString()).to.equal('PDF_OK');
            // ensure Handlebars compiled template was passed
            expect(capturedHtml).to.equal('<p>bar</p>');
        } finally {
            // restore original
            pdf.create = originalCreate;
        }
    });

    it('rejects if toBuffer returns an error', async () => {
        const pdf = require('html-pdf');
        const originalCreate = pdf.create;
        pdf.create = (html, opt) => ({
            toBuffer: (cb) => cb(new Error('buffer failed'))
        });

        try {
            try {
                await convert({ html: '<p>{{foo}}</p>', data: { foo: 'bar' }, type: 'buffer' }, {});
                throw new Error('Expected function to reject');
            } catch (err) {
                expect(err).to.be.an('error');
                expect(err.message).to.equal('buffer failed');
            }
        } finally {
            pdf.create = originalCreate;
        }
    });

    it('resolves with a stream when type is stream', async () => {
        const { Readable } = require('stream');
        const pdf = require('html-pdf');
        const originalCreate = pdf.create;
        let capturedHtml = null;
        const fakeStream = new Readable();
        fakeStream._read = () => { };

        pdf.create = (html, opt) => {
            capturedHtml = html;
            return {
                toStream: (cb) => cb(null, fakeStream)
            };
        };

        try {
            const res = await convert({ html: '<div>{{val}}</div>', data: { val: 'X' }, type: 'stream' }, {});
            expect(res).to.equal(fakeStream);
            expect(capturedHtml).to.equal('<div>X</div>');
        } finally {
            pdf.create = originalCreate;
        }
    });

    it('rejects if toStream returns an error', async () => {
        const pdf = require('html-pdf');
        const originalCreate = pdf.create;
        pdf.create = (html, opt) => ({
            toStream: (cb) => cb(new Error('stream failed'))
        });

        try {
            try {
                await convert({ html: '<p>{{foo}}</p>', data: { foo: 'bar' }, type: 'stream' }, {});
                throw new Error('Expected function to reject');
            } catch (err) {
                expect(err).to.be.an('error');
                expect(err.message).to.equal('stream failed');
            }
        } finally {
            pdf.create = originalCreate;
        }
    });

    it('writes file when type is omitted and uses default path when not provided', async () => {
        const pdf = require('html-pdf');
        const originalCreate = pdf.create;
        let capturedHtml = null;
        let capturedPath = null;

        pdf.create = (html, opt) => {
            capturedHtml = html;
            return {
                toFile: (path, cb) => {
                    capturedPath = path;
                    return cb(null, { filename: path });
                }
            };
        };

        try {
            const res = await convert({ html: '<span>{{n}}</span>', data: { n: 1 } }, { some: 'opt' });
            expect(res).to.deep.equal({ filename: capturedPath });
            expect(capturedPath).to.equal('output.pdf');
            expect(capturedHtml).to.equal('<span>1</span>');
        } finally {
            pdf.create = originalCreate;
        }
    });

    it('rejects if toFile returns an error', async () => {
        const pdf = require('html-pdf');
        const originalCreate = pdf.create;
        pdf.create = (html, opt) => ({
            toFile: (path, cb) => cb(new Error('file failed'))
        });

        try {
            try {
                await convert({ html: '<p>{{foo}}</p>', data: { foo: 'bar' } }, {});
                throw new Error('Expected function to reject');
            } catch (err) {
                expect(err).to.be.an('error');
                expect(err.message).to.equal('file failed');
            }
        } finally {
            pdf.create = originalCreate;
        }
    });
});
