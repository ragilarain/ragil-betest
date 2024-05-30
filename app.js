const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const redis = require('redis')
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');
const swaggerDocument = require('./swagger-output.json');

const indexRouter = require('./routes/index');
const authRoute = require("./app/api/v1/auth/routes");
const usersRouter = require('./app/api/v1/users/routes')

const v1 = "/api/v1";

const notFoundMiddleware = require("./app/middlewares/not-found");
const handleErrorMiddleware = require("./app/middlewares/handler-error");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use(`${v1}`, authRoute)
app.use(`${v1}`, usersRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);
module.exports = app;
