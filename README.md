# Zen Quote

Zen Quote is a Node.js RESTful API for accessing Zen Quotes from a SQLite3 database. Also provides a web UI that communicates with the API through javascript.

https://github.com/magnus-leksell/zen-quote/

## Get the source

    git clone https://github.com/magnus-leksell/zen-quote.git

## Build

    npm install

## Start the server

    npm run devstart

This starts the server on port 3000. Use a web browser and go to http://localhost:3000/ for the nice user interface.

## Web user interface

![Zen Quote](./docs/images/zen-quote.png)

A user friendly interaction with the API using static html, vanilla javascript and css.

### `/?id={id}`

Shows a specific quote in the UI with the given id, example `/?id=42`.

### `/api-docs`

Detailed documentation about the endpoints below.

## API endpoints

Queries to the database is case insensitive.

### `GET /api/authors`

Returns all authors or authors mathcing optional query, `?q=something`, at least 3 characters needed. Example `/api/authors?q=watts` which return authors containing _watts_.

### `GET /api/quotes/{id}`

Returns a quote. Example `/api/quotes/585`.

### `GET /api/quotes/random`

Returns a random quote.

### `GET /api/quotes`

Returns quotes matching query. Example `/api/quotes?q=zen` which returns quotes which quote text **or** author contains _zen_ (this is the search done from the user interface), `/api/quotes?author=watts` which returns quotes that have author containing _watts_, or `/api/quotes?q=zen&author=watts` which returns quotes that contains _zen_ **and** have author containing _watts_. One of, or both, query parameters `q` or `author`is required, and at least 3 characters each needed to be considered when quering the database.

## Author

**Magnus Leksell** - https://github.com/magnus-leksell

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.