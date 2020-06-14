let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan');
let compression = require('compression');
let helmet = require('helmet');

const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./docs/openapi');

let apiRouter = require('./routes/api');

let app = express();

app.use(logger('[:date[clf]] :method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());
app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
app.use('/api', apiRouter);
app.use('/api/*', (req, res, next) => {
    next(createError(404));
});

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
