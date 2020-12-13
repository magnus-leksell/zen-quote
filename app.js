const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const compression = require('compression');

const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./docs/openapi');

const apiRouter = require('./routes/api');
const app = express();

app.use(logger('[:date[clf]] :method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

// routes
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    console.log(err.message);

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.send(err);
});

module.exports = app;
