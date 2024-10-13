const express = require('express');
const { handleUserLogin } = require('../Controllers/Auth');
const loginRouter = express.Router();

loginRouter.post("/", handleUserLogin)

module.exports = loginRouter