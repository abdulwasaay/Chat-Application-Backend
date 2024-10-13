const express = require('express');
const ForgotPass = require('../Controllers/ForgotEmail');
const forgotRouter = express.Router();

forgotRouter.post("/", ForgotPass)

module.exports = forgotRouter