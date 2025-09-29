const express = require("express");
const db = require("./infrastructure/database");
const bodyParser = require("body-parser");
const MongoUserRepository = require("./adapter/orm/MongoUserRepository");
const AuthService = require("./domain/service/AuthService");
const UserService = require("./domain/service/UserService");
const createAuthController  = require("./adapter/framework/controller/AuthController");
const createUserController = require("./adapter/framework/controller/UserController");
const authJwt = require("./adapter/security/authJwt");
const JWT_SECRET = "123218vcafd912389u12j3n12k3j12";
const app = express();

app.use(bodyParser.json());
//configuracion mongodb
db.connect("mongodb://localhost:27017/newbank");

//crear repositorio y servicios
const userRepository = new MongoUserRepository();
const authService = new AuthService(userRepository, JWT_SECRET);
const userService = new UserService(userRepository);
const cors = require("cors");

//rutas
app.use(cors());
//publicas
app.use("/api/auth", createAuthController(authService));

//protegidas
app.use("/api/user", authJwt(JWT_SECRET), createUserController(userService));

module.exports = app;