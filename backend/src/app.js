const express = require("express");
const db = require("./infrastructure/database");
const bodyParser = require("body-parser");
const MongoUserRepository = require("./adapter/orm/MongoUserRepository");
const AuthService = require("./domain/service/AuthService");
const UserService = require("./domain/service/UserService");
const createAuthController = require("./adapter/framework/controller/AuthController");
const createUserController = require("./adapter/framework/controller/UserController");
const authJwt = require("./adapter/security/authJwt");
const JWT_SECRET = process.env.JWT_SECRET || "clave-temporal";
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

//crear repositorio y servicios
const userRepository = new MongoUserRepository();
const authService = new AuthService(userRepository, JWT_SECRET);
const userService = new UserService(userRepository);

//rutas
app.use("/api/auth", createAuthController(authService));
app.use("/api/user", authJwt(JWT_SECRET), createUserController(userService));

module.exports = app;
