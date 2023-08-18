const express = require('express');
const AuthController =  require('../Eneagrama/Controladores/auth');
const md_auth = require("../Eneagrama/Middlewares/checkEmail");

const api = express.Router();

api.post("/auth/register", md_auth.checkEmailExists, AuthController.register);
api.post("/auth/login", AuthController.login);

module.exports = api;
