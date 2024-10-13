const express = require('express');
const { handleUserSignUp } = require('../Controllers/Auth');
const signupRouter = express.Router();

signupRouter.post("/", handleUserSignUp)

module.exports = signupRouter