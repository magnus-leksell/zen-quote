const expect = require('chai').expect;
const quoteService = require('../services/quoteService');

describe('#findAuthors()', () => {
    it('should find author Alan Watts', async () => {
        const author = 'alan watts';
        const authors = await quoteService.findAuthors(author);

        expect(authors).to.be.an('array');
        expect(authors).to.have.length(1);
        expect(authors[0].author.toLowerCase()).to.be.have.string(author);
    });
});

describe('#findById()', () => {
    it('should find quote by id 42', async () => {
        const id = 42;
        const quote = await quoteService.findById(id);

        expect(quote.id).to.be.equal(id);
    });
});

describe('#findOneRandomly()', () => {
    it('should find a random quote', async () => {
        const quote = await quoteService.findOneRandomly();

        expect(quote).to.have.property('id');
        expect(quote).to.have.property('author');
        expect(quote).to.have.property('quote');
    });
});

describe('#find()', () => {
    it('should find quotes containing "zen" or having authors containing "zen"', async () => {
        const str = 'zen';
        const quotes = await quoteService.find(str);

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
        const str = 'zen';
        const author = 'watts';
        const quotes = await quoteService.find(str, author);

        expect(quotes).to.be.an('array');

        quotes.forEach((quote) => {
            expect(quote).to.satisfies((q) => {
                return q.author.toLowerCase().includes(author)
                    && q.quote.toLowerCase().includes(str);
            });
        });
    });
});
