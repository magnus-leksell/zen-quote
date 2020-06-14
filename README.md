# Zen Quote

Zen Quote is a [Node.js](https://github.com/nodejs) RESTful API server and a single-page web application. It is based on the [Express](http://expressjs.com/) web framework and [Sequelize](https://sequelize.org/) ORM for database access.

The web application is one static HTML page, vanilla JavaScript and CSS. The database is a file-based SQLite3.

https://github.com/magnus-leksell/zen-quote/

## Get

    git clone https://github.com/magnus-leksell/zen-quote.git

## Build

    npm install

## Start

    npm run start

This starts the server on port 3000. Use a web browser and go to http://localhost:3000/ and enjoy.

## Enjoy

<a href="./docs/images/zen-quote.png" target="_blank"><img src="./docs/images/zen-quote.png" width="400"></a>
<a href="./docs/images/authors.png" target="_blank"><img src="./docs/images/authors.png" width="400"></a>

### `/?id={id}`

Shows a specific quote in the UI with the given id, example `/?id=42`.

### `/api-docs`

Detailed documentation about the endpoints below.

## API endpoints

All responses is of type `application/json` in `UTF-8` encoding. Note that queries to the database are made case insensitive.

### `GET /api/authors`

Returns all authors or authors matching optional query, `?q=something`. At least 3 characters needed. Example `/api/authors?q=watts` which return authors containing *watts*.

### `GET /api/quotes/{id}`

Returns a quote. Example `/api/quotes/585`.

### `GET /api/quotes/random`

Returns a random quote.

### `GET /api/quotes`

Returns quotes matching query. Example `/api/quotes?q=zen` which returns quotes which quote text **or** author contains *zen* (this is the search done from the user interface), `/api/quotes?author=watts` which returns quotes that have author containing *watts*, or `/api/quotes?q=zen&author=watts` which returns quotes that contains *zen* **and** have author containing *watts*. One of, or both, query parameters `q` or `author`is required, and at least 3 characters each needed to be considered when quering the database.

## The database

`db/quotes.db` is a SQLite3 database file. It contains one table, quotes, in `UTF-8` encoding is defined as follows;

Column | Type | Description
-------|------|------------
id | Integer | Primary key
author | String | Name of author
quote | String | Quote text

Actual type in the database file is `Text`, not `String`, because features of SQLite3.

## Notes

There are 893 quotes from about 214 different authors in the database.

## Author

**Magnus Leksell** - https://github.com/magnus-leksell

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.