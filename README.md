# Zen Quote

Zen Quote is a web application and a [Node.js](https://nodejs.org) REST API server, that displays quotes from different authors. It is based on the [Express](http://expressjs.com/) web framework and [Sequelize](https://sequelize.org/) ORM for database access.

## Features
- Random quote
- List authors
- Quotes by author
- Search quotes and authors

## Live demonstration

https://sajberspejs.com/zen

## Technical
- Smooth single-page web application
- Vanilla JavaScript
- SASS/CSS
- REST API server
- File-based [SQLite](https://sqlite.org/) database

## Get

    git clone https://github.com/magnus-leksell/zen-quote.git

## Install

    npm install

## Start

    npm run start

This starts the server, default on port 3000. Use a web browser and go to http://localhost:3000/ and enjoy. Another way to start it is `npm run devstart`.

## Web application

<a href="./docs/images/zen-quote.png" target="_blank"><img src="./docs/images/zen-quote.png" width="400"></a>
<a href="./docs/images/authors.png" target="_blank"><img src="./docs/images/authors.png" width="400"></a>

## API server endpoints

All responses is of type `application/json` in `UTF-8` encoding. Note that queries to the database are made case insensitive. Detailed documentation about the API endpoints below can be found at `/api-docs`, example http://localhost:3000/api-docs.

### `GET /api/authors`

Returns all authors or authors matching optional query, `?q=something`. At least 3 characters needed. Example `/api/authors?q=watts` which return authors containing *watts*.

### `GET /api/quotes/{id}`

Returns a quote. Example `/api/quotes/585`.

### `GET /api/quotes/random`

Returns a random quote.

### `GET /api/quotes`

Returns quotes matching query. Example `/api/quotes?q=zen` which returns quotes which quote text **or** author contains *zen* (this is the search done from the user interface), `/api/quotes?author=watts` which returns quotes that have author containing *watts*, or `/api/quotes?q=zen&author=watts` which returns quotes that contains *zen* **and** have author containing *watts*. One of, or both, query parameters `q` or `author`is required, and at least 3 characters each needed to be considered when quering the database.

## Server application structure

It is base on this pattern; Route -> Controller -> Service -> Database.

### Example route `GET /api/quotes/random`

#### app.js

    app.use('/api', apiRouter);

#### api.js

    router.get('/quotes/random', quoteController.getRandomQuote);

#### quoteController.js

    exports.getRandomQuote = wrap(async (req, res, next) => {
        const quote = await quoteService.findOneRandomly();
        res.send(quote);
    });

#### quoteService.js
    exports.findOneRandomly = async () => {
        return new Promise((resolve, reject) => {
            Quote.findOne({ order: db.sequelize.random(), limit: 1 })
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

### Model

#### Quote.js

    module.exports = (sequelize, Sequelize) => {
        const Quote = sequelize.define('quote', {
            // attributes
            author: {
                type: Sequelize.STRING,
                allowNull: false
            },
            quote: {
                type: Sequelize.TEXT,
                allowNull: false
            }
        }, {
            // options
            timestamps: false
        });

        return Quote;
    };

Please note that the `id` column is added automatically by Sequalize.

## The database

`db/quotes.db` is a SQLite3 database file. It contains one table, quotes, in `UTF-8` encoding, defined as follows;

Column | Type | Description
-------|------|------------
id | Integer | Primary key
author | String | Name of author
quote | Text | Quote text

There are 893 quotes from about 214 different authors in the database.

## Author

**Magnus Leksell** - https://github.com/magnus-leksell

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.