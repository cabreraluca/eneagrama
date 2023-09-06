const express = require("express");
const AuthController = require("../Controladores/auth");
const md_auth = require("../Middlewares/checkEmail");
const login_auth = require("../Middlewares/auth");

const api = express.Router();

api.post("/auth/register", md_auth.checkEmailExists, AuthController.register);
api.post("/auth/login", AuthController.login);
api.post("/auth/resetpassword", AuthController.sendPasswordResetEmail);

module.exports = api;
