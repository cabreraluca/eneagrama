const express = require('express');
const UserController = require('../Controladores/user');
const md_auth = require("../Middlewares/auth");

const api = express.Router();

api.patch("/user/:id",md_auth.auth, UserController.updateUser);
api.delete("/user/:id", UserController.deleteUser);

module.exports = api;