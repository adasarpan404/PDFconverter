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
        pdf.create = (html, opt) => ({
            toBuffer: (cb) => cb(null, Buffer.from('PDF_OK'))
        });

        try {
            const res = await convert({ html: '<p>{{foo}}</p>', data: { foo: 'bar' }, type: 'buffer' }, {});
            expect(Buffer.isBuffer(res)).to.be.true;
            expect(res.toString()).to.equal('PDF_OK');
        } finally {
            // restore original
            pdf.create = originalCreate;
        }
    });
});
