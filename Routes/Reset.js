const express = require('express');
const ResetPassword = require('../Controllers/ResetPassword');
const resetRouter = express.Router();

resetRouter.put("/" ,ResetPassword)

module.exports = resetRouter