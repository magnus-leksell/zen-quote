let express = require('express');
let router = express.Router();
const quoteController = require('../controllers/quoteController');

router.get('/authors', quoteController.searchAuthors);

router.get('/quotes/random', quoteController.getRandomQuote);

router.get('/quotes/:id', quoteController.getQuote);

router.get('/quotes', quoteController.searchQuotes);

module.exports = router;
