const express = require('express');
const {API_VERSION} = require('./constants');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors({
    origin: 'https://flrtw2zz-3000.brs.devtunnels.ms',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));
const AuthRoutes = require('./Router/auth');
const UserRoutes = require('./Router/user');

app.use(`/api/${API_VERSION}`, AuthRoutes);
app.use(`/api/${API_VERSION}`, UserRoutes);

module.exports = app;
