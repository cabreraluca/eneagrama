const express = require('express');
const {API_VERSION} = require('./constants');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//BodyParser para recibir correctamente los bodys en las requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

const AuthRoutes = require('./Router/auth');
const UserRoutes = require('./Router/user');

app.use(`/api/${API_VERSION}`, AuthRoutes);
app.use(`/api/${API_VERSION}`, UserRoutes);

module.exports = app;
