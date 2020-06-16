# Zen Quote

Zen Quote is a web application and a [Node.js](https://nodejs.org) REST API server, that displays quotes from different authors. It is based on the [Express](http://expressjs.com/) web framework and [Sequelize](https://sequelize.org/) ORM for database access.

## Features
- Random quote
- List authors
- Quotes by author
- Search quotes and authors

## Try it

https://sajberspejs.com/zen

## Technical
- Single-page web application
- Vanilla JavaScript
- REST API server
- File-based [SQLite](https://sqlite.org/) database

## Get

```shell
$ git clone https://github.com/magnus-leksell/zen-quote.git
```

## Install

```shell
$ npm install
```

## Start

```shell
$ npm run start
```

This starts the server, default on port 3000. Use a web browser and go to http://localhost:3000/ and enjoy. Other way to start it is `npm run devstart`, which starts the server using `nodemon`, usefull in development mode.

## Web application

<a href="./docs/images/zen-quote.png" target="_blank"><img src="./docs/images/zen-quote.png" width="400"></a>
<a href="./docs/images/authors.png" target="_blank"><img src="./docs/images/authors.png" width="400"></a>

The web application is made of one static HTML5 file, CSS3 styling and fast JavaScript code that communicates with the backend API server with asynchronous calls, Ajax. This makes it a smooth user experience. Using nice free icons from [Font Awesome](https://fontawesome.com/).

### Build CSS from SASS

Changes made in any of the two sass-files requires building the css-file using the following command

```shell
$ npm run build-css
```

which will construct and minimize `public/css/zen.css`.

## API server endpoints

All responses is of type JSON in UTF-8 encoding. Note that queries to the database are made case insensitive. Detailed documentation about the API endpoints below can be found at `/api-docs`, example http://localhost:3000/api-docs.

### `GET /api/authors`

Returns all authors or authors matching optional query, `?q=something`. At least 3 characters needed. Example `/api/authors?q=watts` which return authors containing *watts*.

### `GET /api/quotes/{id}`

Returns a quote. Example `/api/quotes/585`.

### `GET /api/quotes/random`

Returns a random quote.

### `GET /api/quotes`

Returns quotes matching query. Example `/api/quotes?q=zen` which returns quotes which quote text **or** author contains *zen* (this is the search done from the user interface), `/api/quotes?author=watts` which returns quotes that have author containing *watts*, or `/api/quotes?q=zen&author=watts` which returns quotes that contains *zen* **and** have author containing *watts*. One of, or both, query parameters `q` or `author`is required, and at least 3 characters each needed to be considered when quering the database.

## Server application structure

It is following the pattern Route -> Controller -> Service -> Model

### Example route `GET /api/quotes/random`

#### app.js

```JavaScript
app.use('/api', apiRouter);
```

#### routes/api.js

```JavaScript
router.get('/quotes/random', quoteController.getRandomQuote);
```

#### controllers/quoteController.js

```JavaScript
exports.getRandomQuote = wrap(async (req, res, next) => {
    const quote = await quoteService.findOneRandomly();
    res.send(quote);
});
```

#### services/quoteService.js

```JavaScript
exports.findOneRandomly = async () => {
    return new Promise((resolve, reject) => {
        Quote.findOne({ order: db.sequelize.random() })
              .then(data => {
                  resolve(data);
              })
              .catch(err => {
                  reject(err);
              });
      });
 }
```

#### models/quote.js

```JavaScript
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
```

Note that the `id` column is added automatically by Sequelize.

## The database

`db/quotes.db` is a SQLite3 database file. It contains one table, quotes, in UTF-8 encoding, defined as follows;

Column | Type | Description
-------|------|------------
id | Integer | Primary key
author | Text | Name of author
quote | Text | Quote text

There are 893 quotes from about 214 different authors in the database.

## Author

**Magnus Leksell** - https://github.com/magnus-leksell

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.