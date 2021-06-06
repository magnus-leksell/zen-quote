const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

const app = require('../app');

chai.use(chaiHttp);

describe('#API server', () => {
    it('should get authors', done => {
        chai.request(app)
            .get('/api/authors')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array').and.have.length(335);

                done();
            });
    });

    it('should get a quote', done => {
        const id = 862;

        chai.request(app)
            .get('/api/quotes/' + id)
            .end((err, res) => {
                expect(res).to.have.status(200);

                const quote = res.body;

                expect(quote.id).to.be.equal(id);

                done();
            });
    });

    it('should not get quote', done => {
        const id = 'whatever';

        chai.request(app)
            .get('/api/quotes/' + id)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body.message).to.be.equal('Not Found');

                done();
            });
    });

    it('should get a random quote', done => {
        chai.request(app)
            .get('/api/quotes/random')
            .end((err, res) => {
                expect(res).to.have.status(200);

                const quote = res.body;

                expect(quote).to.have.property('id');
                expect(quote).to.have.property('author');
                expect(quote).to.have.property('quote');

                done();
            });
    });

    it('should get empty array', done => {
        chai.request(app)
            .get('/api/quotes?q=foobar')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array').that.is.empty;
                done();
            });
    });

});
