let createError = require('http-errors');
const quoteService = require('../services/quoteService');

let wrap = fn => (...args) => fn(...args).catch(args[2]);

exports.searchAuthors = wrap(async (req, res, next) => {
    let author = req.query.q;

    if (author && author.length < 3) {
        author = undefined;
    }

    const data = await quoteService.findAuthors(author);
    res.send(data);
});

exports.getQuote = wrap(async (req, res, next) => {
    const quote = await quoteService.findById(req.params.id);
    !!quote ? res.send(quote) : next(createError.NotFound());
});

exports.getRandomQuote = wrap(async (req, res, next) => {
    const quote = await quoteService.findOneRandomly();
    res.send(quote);
});

exports.searchQuotes = wrap(async (req, res, next) => {
    let query = req.query.q;
    let author = req.query.author;

    if (query && query.length < 3) {
        query = undefined;
    }

    if (author && author.length < 3) {
        author = undefined;
    }

    let quotes = [];

    if (query || author) {
        quotes = await quoteService.find(query, author);
    }

    res.send(quotes);
});

