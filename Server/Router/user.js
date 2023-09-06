const express = require("express");
const UserController = require("../Controladores/user");
const md_auth = require("../Middlewares/auth");

const api = express.Router();

api.patch("/user/:id", UserController.updateUser);
api.delete("/user/:id", UserController.deleteUser);
api.get("/user/me", md_auth.auth, UserController.getMe);
api.get("/users", UserController.getUsers);
api.get("/user/:id", md_auth.auth, UserController.getUser);
api.get("/userToken/:token", UserController.getUserByToken);

module.exports = api;
