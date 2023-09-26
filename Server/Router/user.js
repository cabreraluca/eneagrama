const express = require("express");
const UserController = require("../Controladores/user");
const md_auth = require("../Middlewares/auth");
const emailAuth = require("../Middlewares/checkEmail");


const api = express.Router();

api.patch("/user/:id", UserController.updateUser);
api.post("/user", [md_auth.auth, emailAuth.checkEmailExists], UserController.createUser);
api.delete("/user/:id", md_auth.auth, UserController.deleteUser);
api.get("/user/me", md_auth.auth, UserController.getMe);
api.get("/users", UserController.getUsers);
api.get("/filterUsers", md_auth.auth, UserController.filterUsers);
api.get("/user/:id", md_auth.auth, UserController.getUser);
api.get("/userToken/:token", UserController.getUserByToken);
api.get("/usersByCompany/:company", UserController.getCompanyUsers);
api.get("/companiesList", UserController.getCompaniesList)

module.exports = api;
