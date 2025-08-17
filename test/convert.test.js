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
});
