let expect = require('chai').expect;
let quoteService = require('../services/quoteService');

describe('#findAuthors()', () => {
    it('should find author Alan Watts', async () => {
        let author = 'alan watts';
        let authors = await quoteService.findAuthors(author);

        expect(authors).to.be.an('array');
        expect(authors).to.have.length(1);
        expect(authors[0].author.toLowerCase()).to.be.have.string(author);
    });
});

describe('#findById()', () => {
    it('should find quote by id', async () => {
        let id = 42;
        let quote = await quoteService.findById(id);

        expect(quote.id).to.be.equal(id);
    });
});

describe('#findOneRandomly()', () => {
    it('should find a random quote', async () => {
        let quote = await quoteService.findOneRandomly();

        expect(quote).to.have.property('id');
        expect(quote).to.have.property('author');
        expect(quote).to.have.property('quote');
    });
});

describe('#find()', () => {
    it('should find quotes or authors containing "zen"', async () => {
        let str = 'zen';
        let quotes = await quoteService.find(str);

        expect(quotes).to.be.an('array');

        quotes.forEach((quote) => {
            expect(quote).to.satisfies((q) => {
                return q.author.toLowerCase().includes(str)
                    || q.quote.toLowerCase().includes(str);
            });
        });
    });
});

describe('#find()', () => {
    it('should find quotes containing "zen" and have author containing "watts"', async () => {
        let str = 'zen';
        let author = 'watts';
        let quotes = await quoteService.find(str, author);

        expect(quotes).to.be.an('array');

        quotes.forEach((quote) => {
            expect(quote).to.satisfies((q) => {
                return q.author.toLowerCase().includes(author)
                    && q.quote.toLowerCase().includes(str);
            });
        });
    });
});
